import { TProductsQuerySchema } from '@/schemas';
import {
  cartTable,
  imageTable,
  productImageTable,
  productRatingTable,
  productTable,
  vendorStoreTable,
  wishlistTable,
} from '@marketly/drizzle/db/schemas';
import { and, asc, dbClient, desc, eq, gte, ilike, lte, or, sql } from '@marketly/drizzle/index';
import { NotFoundError } from '@marketly/http/api-error';

interface GetProductsQueryOptions extends TProductsQuerySchema {
  search?: string;
  category?: string;
  tags?: string[];
}

const productQueryOptions = (options: GetProductsQueryOptions) => {
  let { limit, page, sort = 'desc', isAvailable, search, category, tags, min, max } = options;

  let whereConditions = [
    eq(productTable.isDeleted, false), // check if product is not deleted
  ];

  if (isAvailable) {
    whereConditions.push(eq(productTable.isAvailable, true)); // check if product is available
  }

  if (category) {
    whereConditions.push(eq(productTable.category, category)); // search by product category
  }

  if (search) {
    whereConditions.push(
      or(
        ilike(productTable.name, `%${search}%`), // search by product name
        ilike(productTable.description, `%${search}%`), // search by product description
      ) as any,
    );
  }

  if (min || max) {
    if (min && max) {
      whereConditions.push(and(gte(productTable.price, min), lte(productTable.price, max)) as any); // search by product price
    } else if (min) {
      whereConditions.push(gte(productTable.price, min)); // search by product price
    } else if (max) {
      whereConditions.push(lte(productTable.price, max)); // search by product price
    }
  }

  if (tags) {
    if (tags.length > 0) {
      const tagFilters = tags.map(
        tag => sql`${sql.raw('("products"."tags"::jsonb)')} @> ${sql.raw(`'["${tag}"]'::jsonb`)}`, // search by product tags
      );

      whereConditions.push(or(...tagFilters) as any);
    }
  }

  return {
    limit,
    page,
    sort,
    whereConditions,
  };
};

/**
 * Get products
 *
 * - minimal details query - for public
 */
export const getProductsQuery = async (options: GetProductsQueryOptions, accountId?: number) => {
  const { limit, page, sort, whereConditions } = productQueryOptions(options);

  const productsData = await dbClient
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
        eq(wishlistTable.accountId, accountId!),
      ),
    )
    .leftJoin(
      cartTable,
      and(
        eq(cartTable.productId, productTable.id), // check if product is in cart
        eq(cartTable.accountId, accountId!),
      ),
    )
    .where(and(...whereConditions))
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy(
      eq(
        productTable.createdAt,
        sort === 'asc' ? asc(productTable.createdAt) : desc(productTable.createdAt),
      ),
    );

  return productsData.map(p => {
    return { ...p, isInWishlist: !!p.isInWishlist };
  });
};

export const getNoOfProductsQuery = async (options: GetProductsQueryOptions): Promise<number> => {
  const { whereConditions } = productQueryOptions(options);
  const query = await dbClient
    .select({
      noOfProducts: sql<number>`count(*)`,
    })
    .from(productTable)
    .where(and(...whereConditions));

  return query[0].noOfProducts ?? 0;
};

// Get product details for consumer
export const getProductBySlug = async (slug: string) => {
  const product = await dbClient.query.productTable.findFirst({
    where: and(
      eq(productTable.slug, slug), // search by product slug
      eq(productTable.isDeleted, false), // check if product is not deleted
    ),
    columns: {
      addedById: false,
      images: false,
      isDeleted: false,
      isAvailable: false,
    },
    with: {
      store: {
        columns: {
          id: true,
          storeName: true,
          isVerified: true,
        },
        with: {
          storeLogo: {
            columns: {
              url: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  const productImages = await dbClient
    .select({
      id: productImageTable.id,
      url: imageTable.url,
      alt: imageTable.alt,
      order: productImageTable.order,
      metadata: imageTable.metadata,
    })
    .from(productImageTable)
    .leftJoin(imageTable, eq(productImageTable.imageId, imageTable.id))
    .where(eq(productImageTable.productId, product.id))
    .orderBy(asc(productImageTable.order));

  const ratings = await dbClient
    .select({
      rating: productRatingTable.rating,
    })
    .from(productRatingTable)
    .where(eq(productRatingTable.productId, product.id));

  const avgRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

  return {
    ...product,
    images: productImages,
    rating: avgRating,
    noOfRatings: ratings.length,
    store: {
      ...product.store,
      storeLogoUrl: product.store?.storeLogo?.url,
    },
  };
};
