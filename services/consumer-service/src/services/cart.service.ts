import { count, dbClient, or } from '@marketly/drizzle';
import {
  cartTable,
  imageTable,
  productImageTable,
  productTable,
  vendorStoreTable,
} from '@marketly/drizzle/db/schemas';
import { eq, and } from '@marketly/drizzle';

export const getCartItems = async (accountId: number) => {
  return await dbClient
    .select({
      id: cartTable.id,
      quantity: cartTable.quantity,
      createdAt: cartTable.createdAt,
      updatedAt: cartTable.updatedAt,
      product: {
        id: productTable.id,
        name: productTable.name,
        slug: productTable.slug,
        price: productTable.price,
        discount: productTable.discount,
        description: productTable.description,
        category: productTable.category,
        tags: productTable.tags,
        stock: productTable.stock,
        imageUrl: imageTable.url,
        storeName: vendorStoreTable.storeName,
        storeId: vendorStoreTable.id,
      },
    })
    .from(cartTable)
    .leftJoin(productTable, eq(cartTable.productId, productTable.id))
    .leftJoin(
      productImageTable,
      and(
        eq(productTable.id, productImageTable.productId),
        or(eq(productImageTable.isPrimary, true), eq(productImageTable.order, 0)),
      ),
    )
    .leftJoin(imageTable, eq(productImageTable.imageId, imageTable.id))
    .leftJoin(vendorStoreTable, eq(productTable.storeId, vendorStoreTable.id))
    .where(eq(cartTable.accountId, accountId));
};

export const getCartItem = async (accountId: number, productId: number) => {
  return await dbClient.query.cartTable.findFirst({
    where: and(eq(cartTable.accountId, accountId), eq(cartTable.productId, productId)),
  });
};

export const getCartItemById = async (id: number) => {
  return await dbClient.query.cartTable.findFirst({
    where: eq(cartTable.id, id),
  });
};

export const addToCart = async (accountId: number, productId: number, quantity: number = 1) => {
  return (
    await dbClient
      .insert(cartTable)
      .values({
        accountId,
        productId,
        quantity: Math.max(1, Math.min(10, quantity)),
      })
      .returning()
  )[0];
};

export const updateCartItemQuantity = async (cartId: number, quantity: number) => {
  return (
    await dbClient
      .update(cartTable)
      .set({
        quantity: Math.max(1, Math.min(10, quantity)),
        updatedAt: new Date(),
      })
      .where(eq(cartTable.id, cartId))
      .returning()
  )[0];
};

export const removeFromCart = async (cartId: number) => {
  return (
    await dbClient
      .delete(cartTable)
      .where(
        eq(cartTable.id, cartId), // By card id
      )
      .returning()
  )[0];
};

export const clearCart = async (accountId: number) => {
  return await dbClient
    .delete(cartTable)
    .where(
      eq(cartTable.accountId, accountId), // by account id
    )
    .returning();
};

export const getCartItemCount = async (accountId: number): Promise<number> => {
  const result = await dbClient
    .select({ count: count() })
    .from(cartTable)
    .where(eq(cartTable.accountId, accountId));

  return Number(result[0]?.count || 0);
};
