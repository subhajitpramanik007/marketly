import { dbClient, or } from '@marketly/drizzle';
import {
  cartTable,
  imageTable,
  productImageTable,
  productTable,
  vendorStoreTable,
  wishlistTable,
} from '@marketly/drizzle/db/schemas';
import { eq, and } from '@marketly/drizzle';

export const getWishlists = async (accountId: number) => {
  return await dbClient
    .select({
      id: productTable.id,
      name: productTable.name,
      slug: productTable.slug,
      price: productTable.price,
      discount: productTable.discount,
      description: productTable.description,
      category: productTable.category,
      tags: productTable.tags,
      stock: productTable.stock,
      createdAt: productTable.createdAt,
      imageUrl: imageTable.url,
      storeName: vendorStoreTable.storeName,
      storeId: vendorStoreTable.id,
      isInWishlist: wishlistTable.id,
      cart: {
        exists: cartTable.id,
        quantity: cartTable.quantity,
      },
    })
    .from(productTable)
    .leftJoin(
      productImageTable,
      and(
        eq(productTable.id, productImageTable.productId), // match product id
        or(eq(productImageTable.isPrimary, true), eq(productImageTable.order, 0)), // match primary image or order 0
      ),
    )
    .leftJoin(
      imageTable,
      eq(productImageTable.imageId, imageTable.id), // get image details
    )
    .leftJoin(
      vendorStoreTable,
      eq(productTable.storeId, vendorStoreTable.id), // get store details
    )
    .leftJoin(
      wishlistTable,
      and(
        eq(wishlistTable.productId, productTable.id), // check if product is in wishlist
        eq(wishlistTable.accountId, accountId),
      ),
    )
    .leftJoin(
      cartTable,
      and(
        eq(cartTable.productId, productTable.id), // check if product is in cart
        eq(cartTable.accountId, accountId),
      ),
    )
    .where(eq(wishlistTable.accountId, accountId));
};

// consumer account id and product id
export const getWishlist = async (accountId: number, productId: number) => {
  return await dbClient.query.wishlistTable.findFirst({
    where: and(
      eq(wishlistTable.accountId, accountId), // account id
      eq(wishlistTable.productId, productId),
    ),
  });
};

export const addToWishlist = async (accountId: number, productId: number) => {
  return (
    await dbClient
      .insert(wishlistTable)
      .values({
        accountId,
        productId,
      })
      .returning()
  )[0];
};

// Wishlist id
export const removeFromWishlist = async (id: number) => {
  return (
    await dbClient
      .delete(wishlistTable)
      .where(eq(wishlistTable.id, id)) // by id
      .returning()
  )[0];
};
