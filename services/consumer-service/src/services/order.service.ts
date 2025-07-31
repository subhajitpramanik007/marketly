import { dbClient, desc, or, sql } from '@marketly/drizzle';
import {
  orderTable,
  orderItemTable,
  paymentTable,
  cartTable,
  productTable,
  imageTable,
  productImageTable,
  vendorStoreTable,
  orderStatusEnum,
} from '@marketly/drizzle/db/schemas';
import { eq, and, inArray } from '@marketly/drizzle';
import { OrderQuery } from '@/schemas';

const OrderStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export const getOrders = async (accountId: number, options: OrderQuery) => {
  const { limit, page, status } = options;
  let statusCondition = undefined;
  if (status && OrderStatus.includes(status)) {
    // @ts-ignore
    statusCondition = eq(orderTable.status, status);
  }
  const rawOrders = await dbClient
    .select({
      id: orderTable.id,
      status: orderTable.status,
      createdAt: orderTable.createdAt,
      updatedAt: orderTable.updatedAt,
      payment: {
        id: paymentTable.id,
        status: paymentTable.status,
        method: paymentTable.method,
        provider: paymentTable.provider,
        amount: paymentTable.amount,
        currency: paymentTable.currency,
        paidAt: paymentTable.paidAt,
      },
    })
    .from(orderTable)
    .leftJoin(paymentTable, eq(orderTable.paymentId, paymentTable.id))
    .where(and(eq(orderTable.accountId, accountId), statusCondition))
    .orderBy(desc(orderTable.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  const orderIds = rawOrders.map(order => order.id);

  const ordersItems = await dbClient
    .select({
      id: orderItemTable.id,
      quantity: orderItemTable.quantity,
      priceAtPurchase: orderItemTable.priceAtPurchase,
      productId: productTable.id,
      name: productTable.name,
      slug: productTable.slug,
      description: productTable.description,
      imageUrl: imageTable.url,
      storeName: vendorStoreTable.storeName,
      storeId: vendorStoreTable.id,
      orderId: orderItemTable.orderId,
    })
    .from(orderItemTable)
    .leftJoin(productTable, eq(orderItemTable.productId, productTable.id))
    .leftJoin(
      productImageTable,
      and(
        eq(productTable.id, productImageTable.productId),
        or(eq(productImageTable.isPrimary, true), eq(productImageTable.order, 0)),
      ),
    )
    .leftJoin(imageTable, eq(productImageTable.imageId, imageTable.id))
    .leftJoin(vendorStoreTable, eq(productTable.storeId, vendorStoreTable.id))
    .where(inArray(orderItemTable.orderId, orderIds));

  return rawOrders.map(order => ({
    id: order.id,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    payment: order.payment,
    items: ordersItems.filter(item => item.orderId === order.id),
  }));
};

export const getOrderById = async (orderId: number, accountId: number) => {
  const order = await dbClient
    .select({
      id: orderTable.id,
      status: orderTable.status,
      createdAt: orderTable.createdAt,
      updatedAt: orderTable.updatedAt,
      payment: {
        id: paymentTable.id,
        status: paymentTable.status,
        method: paymentTable.method,
        provider: paymentTable.provider,
        amount: paymentTable.amount,
        currency: paymentTable.currency,
        paidAt: paymentTable.paidAt,
        metadata: paymentTable.metadata,
      },
      items: {
        id: orderItemTable.id,
        quantity: orderItemTable.quantity,
        priceAtPurchase: orderItemTable.priceAtPurchase,
        productId: productTable.id,
        name: productTable.name,
        slug: productTable.slug,
        description: productTable.description,
        imageUrl: imageTable.url,
        storeName: vendorStoreTable.storeName,
        storeId: vendorStoreTable.id,
      },
    })
    .from(orderTable)
    .leftJoin(paymentTable, eq(orderTable.paymentId, paymentTable.id))
    .leftJoin(orderItemTable, eq(orderTable.id, orderItemTable.orderId))
    .leftJoin(productTable, eq(orderItemTable.productId, productTable.id))
    .leftJoin(
      productImageTable,
      and(
        eq(productTable.id, productImageTable.productId),
        or(eq(productImageTable.isPrimary, true), eq(productImageTable.order, 0)),
      ),
    )
    .leftJoin(imageTable, eq(productImageTable.imageId, imageTable.id))
    .leftJoin(vendorStoreTable, eq(productTable.storeId, vendorStoreTable.id))
    .where(and(eq(orderTable.id, orderId), eq(orderTable.accountId, accountId)))
    .orderBy(orderTable.createdAt);

  return order.length > 0 ? order[0] : null;
};

export const updateOrderStatus = async (
  orderId: number,
  status: (typeof orderStatusEnum)['enumValues'][number],
) => {
  return (
    await dbClient
      .update(orderTable)
      .set({
        status: status,
        updatedAt: new Date(),
      })
      .where(eq(orderTable.id, orderId))
      .returning()
  )[0];
};

export const cancelOrder = async (orderId: number, accountId: number) => {
  const order = await dbClient.query.orderTable.findFirst({
    where: and(eq(orderTable.id, orderId), eq(orderTable.accountId, accountId)),
  });

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.status !== 'pending') {
    throw new Error('Order cannot be cancelled');
  }

  return await updateOrderStatus(orderId, 'cancelled');
};

// No of orders
export const countOrders = async (accountId: number, status?: string) => {
  let statusCondition = undefined;
  if (status && OrderStatus.includes(status)) {
    // @ts-ignore
    statusCondition = eq(orderTable.status, status);
  }
  return (
    await dbClient
      .select({
        count: sql<number>`count(*)`,
      })
      .from(orderTable)
      .where(and(eq(orderTable.accountId, accountId), statusCondition))
  )[0].count;
};
