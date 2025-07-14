import {
  imageTable,
  productImageTable,
  productTable,
  vendorStoreTable,
} from '@marketly/drizzle/db/schemas';
import {
  and,
  asc,
  dbClient,
  desc,
  eq,
  gt,
  gte,
  ilike,
  lt,
  lte,
  or,
  sql,
} from '@marketly/drizzle/index';

type GetProductsQueryOptions = {
  limit?: number;
  page?: number;
  sort?: 'asc' | 'desc';
  onlyAvailable?: boolean;
  onlyNotDeleted?: boolean;
  search?: string;
  category?: string;
  tags?: string;
  minPrice?: number;
  maxPrice?: number;
};

const productQueryOptions = (options: GetProductsQueryOptions) => {
  let {
    limit = 10,
    page = 1,
    sort = 'desc',
    onlyAvailable = true,
    search,
    category,
    tags,
    minPrice,
    maxPrice,
  } = options;

  let whereConditions = [
    eq(productTable.isDeleted, false), // check if product is not deleted
  ];

  if (onlyAvailable) {
    whereConditions.push(eq(productTable.isAvailable, true)); // check if product is available
  }

  if (category) {
    whereConditions.push(eq(productTable.category, category)); // search by product category
  }

  if (tags) {
    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean); // remove empty strings

    if (tagsArray.length > 0) {
      const pgArrayLiteral = `'{${tagsArray.join(',')}}'`; // e.g. '{toy,new}'
      whereConditions.push(sql`${productTable.tags} && ${sql.raw(pgArrayLiteral)}::text[]`);
    }
  }

  return {
    limit,
    page,
    sort,
    whereConditions,
    search,
    minPrice,
    maxPrice,
  };
};

/**
 * Get products
 *
 * - minimal details query - for public
 */
export const getProductsQuery = (options: GetProductsQueryOptions) => {
  const { limit, page, sort, search, whereConditions, minPrice, maxPrice } =
    productQueryOptions(options);

  const query = dbClient
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
    .where(
      and(
        ...whereConditions,
        search
          ? or(
              ilike(productTable.name, `%${search}%`), // search by product name
              ilike(productTable.description, `%${search}%`), // search by product description
            )
          : undefined,
        minPrice ? gte(productTable.price, minPrice.toString()) : undefined, // search by min price
        maxPrice ? lte(productTable.price, maxPrice.toString()) : undefined, // search by max price
      ),
    )
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy(
      eq(
        productTable.createdAt,
        sort === 'asc' ? asc(productTable.createdAt) : desc(productTable.createdAt),
      ),
    );

  return query;
};

export const getNoOfProductsQuery = (options: GetProductsQueryOptions) => {
  const { whereConditions, search, minPrice, maxPrice } = productQueryOptions(options);
  return dbClient
    .select({
      noOfProducts: sql<number>`count(*)`,
    })
    .from(productTable)
    .where(
      and(
        ...whereConditions,
        search
          ? or(
              ilike(productTable.name, `%${search}%`),
              ilike(productTable.description, `%${search}%`),
            )
          : undefined,
        minPrice ? gte(productTable.price, minPrice.toString()) : undefined,
        maxPrice ? lte(productTable.price, maxPrice.toString()) : undefined,
      ),
    );
};
