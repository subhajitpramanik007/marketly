import {
  productImageTable,
  productTable,
  vendorStaffTable,
  vendorStoreTable,
} from '@marketly/drizzle/db/schemas';
import { and, asc, dbClient, desc, eq, sql } from '@marketly/drizzle/index';
import { BadRequestError } from '@marketly/http/api-error';

const sortProduct = (sort: 'asc' | 'desc' = 'asc') => {
  return sort === 'asc' ? asc(productTable.createdAt) : desc(productTable.createdAt);
};

// FIXME: image details

/*--------------------------------- CONSUMER --------------------------------- */

/**
 * Get all products
 *
 * - minimal details with primary image - for consumer
 *
 * @param limit
 * @param page
 * @param sort
 */
const getAllProductsAsConsumer = async (
  limit: number,
  page: number,
  sort: 'asc' | 'desc' = 'asc',
) => {
  try {
    return await dbClient.query.productTable.findMany({
      where: and(eq(productTable.isAvailable, true), eq(productTable.isDeleted, false)),
      limit: limit,
      offset: (page - 1) * limit,
      orderBy: [sortProduct(sort)],
      columns: {
        addedById: false,
        images: false,
        isAvailable: false,
        updatedAt: false,
        isDeleted: false,
      },
      extras: {
        storeName: sql`${vendorStoreTable.storeName}`.as('storeName'),
      },
      with: {
        images: {
          where: eq(productImageTable.isPrimary, true),
          limit: 1,
          columns: {
            id: true,
          },
        },
      },
    });
  } catch (error) {
    throw new BadRequestError('Failed to fetch products');
  }
};

/*-------------------- VENDOR ONLY ---------------------------- */

/**
 * Get all products - for vendor
 *
 * @param storeId
 * @param limit
 * @param page
 * @param sort
 */
const getAllProductsAsVendor = async (
  storeId: number,
  limit: number,
  page: number,
  sort: 'asc' | 'desc' = 'asc',
) => {
  try {
    return await dbClient.query.productTable.findMany({
      where: eq(productTable.storeId, storeId),
      limit: limit,
      offset: (page - 1) * limit,
      orderBy: [sortProduct(sort)],
      columns: {
        addedById: false,
        images: false,
      },
      with: {
        addedBy: {
          columns: {
            avatarId: false,
            phoneNumber: false,
            addedBy: false,
            removedBy: false,
            storeId: false,
          },
          extras: {
            name: sql`${vendorStaffTable.firstName} || ' ' || ${vendorStaffTable.lastName}`.as(
              'name',
            ),
          },
        },
      },
    });
  } catch (error) {
    throw new BadRequestError('Failed to fetch products');
  }
};

/**
 * Get a product details - for vendor
 *
 * @param productId
 * @param storeId
 */
const getAProductDetailsAsVendor = async (storeId: number, productSlug: string) => {
  try {
    const product = await dbClient.query.productTable.findFirst({
      where: and(eq(productTable.slug, productSlug), eq(productTable.storeId, storeId)),
      columns: {
        addedById: false,
        images: false,
      },
      with: {
        addedBy: true,
        images: {
          with: {
            image: true,
          },
        },
      },
    });

    const productImages = product?.images.map(image => {
      return {
        id: image.id,
        url: image.image.url,
        alt: image.image.alt,
        publicId: image.image.publicId,
        isPrimary: image.isPrimary,
        order: image.order,
        createdAt: image.createdAt,
      };
    });

    return {
      ...product,
      images: productImages,
    };
  } catch (error) {
    throw new BadRequestError('Failed to fetch product details');
  }
};

export { getAllProductsAsConsumer, getAllProductsAsVendor, getAProductDetailsAsVendor };
