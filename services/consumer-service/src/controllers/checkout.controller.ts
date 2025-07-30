import {
  checkoutPaymentVerifyBodySchema,
  getCheckoutProductsBodySchema,
} from '@/schemas/checkout.schemas';
import {
  ApiResponse,
  asyncHandler,
  BadRequestError,
  UnauthorizedError,
  zodValidation,
} from '@marketly/http';

import * as checkoutService from '@/services/checkout.service';
import { ICheckoutSummary } from '@/types';
import { razorpayService } from '@/services/razorpay.service';

export const getCheckoutSummary = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;
  const validatedData = zodValidation(getCheckoutProductsBodySchema, req.body);

  //   create checkout session on redis
  const checkoutProducts = await checkoutService.createCheckoutSession(
    accountId,
    validatedData.cartItemIds,
  );

  if (checkoutProducts.length === 0) {
    throw new BadRequestError('Cart is empty');
  }

  const checkoutPriceSummary = await checkoutService.calculateCheckoutSummary(checkoutProducts);

  const responseData: ICheckoutSummary = { ...checkoutPriceSummary, cartItems: checkoutProducts };

  res.status(200).json(new ApiResponse(200, responseData));
});

export const processCheckoutPayment = asyncHandler(async (req, res) => {
  // get checkout session
  const cartItemIds = await checkoutService.getCheckoutSession(req.consumer?.accountId);

  const checkoutPriceSummary = await checkoutService.calculateCheckoutSummary(cartItemIds);
  const payableAmount = checkoutPriceSummary.grandTotal;

  // initiate payment
  const razorpayOrder = await razorpayService.createOrder(
    parseFloat(payableAmount) * 100,
    Date.now(),
    'INR',
    { payableAmount },
  );

  //   logger.debug(razorpayOrder, 'razorpay order create');

  const payment = await checkoutService.createPayment({
    amount: payableAmount,
    status: 'pending',
    currency: 'INR',
    method: 'razorpay',
    provider: 'razorpay',
    razorpayOrderId: razorpayOrder.id,
  });

  //   logger.debug(payment, 'payment table');

  //   // create new order
  const order = await checkoutService.createNewOrder(
    req.consumer?.accountId,
    cartItemIds,
    payment.id,
  );

  //   create checkout session on redis
  await checkoutService.clearCheckoutSession(req.consumer?.accountId);

  res.status(200).json(
    new ApiResponse(200, {
      order: {
        id: order.order.id,
      },
      razorpayPayment: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    }),
  );
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const validatedData = zodValidation(checkoutPaymentVerifyBodySchema, req.body);

  const { razorpay_order_id, razorpay_payment_id } = validatedData;

  await checkoutService.verifyPayment(validatedData);

  const paymentData = await checkoutService.getPaymentdataByRazorOrderId(razorpay_order_id);
  if (paymentData && paymentData.status === 'pending') {
    await checkoutService.onPaymentDone(razorpay_order_id, razorpay_payment_id);
  }

  res.status(200).json({ message: 'ok' });
});

//
export const handleCheckoutWebhook = asyncHandler(async (req, res) => {
  const expectedSignature = await razorpayService.verifyWebhook(req);

  if (!expectedSignature) {
    throw new UnauthorizedError('Invalid razorpay signature');
  }

  const event = req.body;

  const isCapature = event.event === 'payment.captured';
  if (isCapature) {
    const payment = event.payload.payment.entity;

    const paymentData = await checkoutService.getPaymentdataByRazorOrderId(payment.order_id);
    if (paymentData && paymentData.status === 'pending') {
      await checkoutService.onPaymentDone(payment.order_id, payment.id);
    }
  }

  res.status(200).json({ status: 'ok' });
});

export const cancelCheckoutSession = asyncHandler(async (req, res) => {
  res.status(200).json({});
});
