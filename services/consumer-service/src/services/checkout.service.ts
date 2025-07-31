import { redisClient } from '@marketly/lib/redis';
import { and, dbClient, eq, inArray, is } from '@marketly/drizzle';

import crypto from 'crypto';

import { DELIVERY_CHARGE } from '@/constants';
import { BadRequestError } from '@marketly/http';

import { CartItem, CheckoutPaymentVerifyBody } from '@/schemas/checkout.schemas';
import { ICheckoutItem, ICheckoutSummary } from '@/types';

import { calculateTotalPrice } from '@/utils/calculateTotalPrice';
import {
  cartTable,
  orderItemTable,
  orderTable,
  paymentTable,
  productImageTable,
  productTable,
} from '@marketly/drizzle/db/schemas';
import { env } from '@marketly/config';
import { logger } from '@marketly/logger';

export const getCheckoutProducts = async (cartItemIds: CartItem[]): Promise<ICheckoutItem[]> => {
  const productIds = cartItemIds.map(item => item.productId);

  const products = await dbClient.query.productTable.findMany({
    where: inArray(productTable.id, productIds),
    columns: {
      id: true,
      name: true,
      price: true,
      discount: true,
      stock: true,
    },
    with: {
      images: {
        where: eq(productImageTable.isPrimary, true),
        with: {
          image: true,
        },
      },
    },
  });

  return products.map(product => {
    const cartItem = cartItemIds.find(item => item.productId === product.id);
    const quantity = cartItem?.quantity || 1;

    const { images, ...rest } = product;

    return {
      ...rest,
      quantity,
      cartItemId: cartItem!.id,
      totalPrice: calculateTotalPrice(product.price, quantity).toFixed(2),
      imageUrl: product.images[0]?.image?.url,
    };
  });
};

export const calculateCheckoutSummary = async (
  items: ICheckoutItem[],
): Promise<Omit<ICheckoutSummary, 'cartItems'>> => {
  const totalPrice = items.reduce((total, item) => total + parseFloat(item.totalPrice), 0);
  const discount = items.reduce(
    (total, item) => total + parseFloat(item.discount || '0.00') * item.quantity,
    0,
  );
  const totalAfterDiscount = totalPrice - discount;
  const deliveryCharge = DELIVERY_CHARGE;
  const totalAfterDeliveryCharge = totalAfterDiscount + deliveryCharge;
  const grandTotal = totalAfterDeliveryCharge;

  return {
    totalPrice: totalPrice.toFixed(2),
    discount: discount.toFixed(2),
    totalAfterDiscount: totalAfterDiscount.toFixed(2),
    deliveryCharge: deliveryCharge.toFixed(2),
    totalAfterDeliveryCharge: totalAfterDeliveryCharge.toFixed(2),
    grandTotal: grandTotal.toFixed(2),
  };
};

export const createCheckoutSession = async (
  accountId: number,
  cartItemIds: CartItem[],
): Promise<ICheckoutItem[]> => {
  const checkoutProducts = await getCheckoutProducts(cartItemIds);

  if (checkoutProducts.length === 0) {
    throw new BadRequestError('Cart is empty');
  }

  //   if already checkout session exists, and if items are same, or delete and create new checkout session
  const existingCheckoutSession = await redisClient.get(`checkout:${accountId}`);

  if (existingCheckoutSession) {
    const existingCheckoutProducts = JSON.parse(existingCheckoutSession);

    if (
      existingCheckoutProducts.length === checkoutProducts.length &&
      // @ts-ignore
      existingCheckoutProducts.every(item => checkoutProducts.some(exItem => exItem.id === item.id))
    ) {
      return existingCheckoutProducts as ICheckoutItem[];
    }
  }

  //   else create new checkout session
  await redisClient.set(
    `checkout:${accountId}`,
    JSON.stringify(checkoutProducts),
    'EX',
    600, // 10 minutes
  );

  return checkoutProducts;
};

export const clearCheckoutSession = async (accountId: number) => {
  await redisClient.del(`checkout:${accountId}`);
};

export const getCheckoutSession = async (accountId: number): Promise<ICheckoutItem[]> => {
  const checkoutSession = await redisClient.get(`checkout:${accountId}`);

  if (!checkoutSession) {
    throw new BadRequestError('Checkout session not found');
  }

  return JSON.parse(checkoutSession) as ICheckoutItem[];
};

export const createNewOrder = async (
  accountId: number,
  cartItems: ICheckoutItem[],
  paymentId: number | null = null,
) => {
  const order = (
    await dbClient
      .insert(orderTable)
      .values({
        accountId,
        paymentId,
        status: 'pending',
      })
      .returning()
  )[0];

  if (!order) {
    throw new Error('Failed to create order');
  }

  const cartItemsForOrder: (typeof orderItemTable.$inferInsert)[] = cartItems.map(item => ({
    orderId: order.id,
    productId: item.id,
    priceAtPurchase: item.price,
    quantity: item.quantity,
  }));

  const orderItems = await dbClient.insert(orderItemTable).values(cartItemsForOrder).returning();

  return { order, orderItems };
};

export const createPayment = async (data: typeof paymentTable.$inferInsert) => {
  return (
    await dbClient
      .insert(paymentTable)
      .values({
        amount: data.amount,
        currency: data.currency,
        method: data.method,
        provider: data.provider,
        status: data.status,
        razorpayOrderId: data.razorpayOrderId,
      })
      .returning()
  )[0];
};

export const verifyPayment = async (data: CheckoutPaymentVerifyBody) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  // Create sign
  const sign = razorpay_order_id + '|' + razorpay_payment_id;

  // Create excted Sign
  const exectedSign = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest('hex');

  const isMatched = exectedSign === razorpay_signature;

  if (!isMatched) {
    throw new BadRequestError('The payment is not authentic');
  }
};

export const getPaymentdataByRazorOrderId = async (razorpayOrderId: string) => {
  return dbClient.query.paymentTable.findFirst({
    where: eq(paymentTable.razorpayOrderId, razorpayOrderId),
  });
};

export const onPaymentDone = async (razorpayOrderId: string, razorpayPaymentId: string) => {
  const updatePaymentData = (
    await dbClient
      .update(paymentTable)
      .set({
        razorpayPaymentId,
        status: 'completed',
        paidAt: new Date(Date.now()),
      })
      .where(eq(paymentTable.razorpayOrderId, razorpayOrderId))
      .returning()
  )[0];

  const order = (
    await dbClient
      .update(orderTable)
      .set({
        status: 'processing',
      })
      .where(eq(orderTable.paymentId, updatePaymentData.id))
      .returning()
  )[0];

  const currentOrderdata = await dbClient.query.orderTable.findFirst({
    where: eq(orderTable.id, order.id),
    with: {
      items: true,
    },
  });

  const productIds = currentOrderdata?.items.map(item => item.productId);

  if (productIds) {
    // remove items form cart
    await dbClient.delete(cartTable).where(inArray(cartTable.productId, productIds));
  }
};
