import { ApiError, asyncHandler, InternalServerError } from '@marketly/http';
import { and, dbClient, eq } from '@marketly/drizzle/index';
import { productTable } from '@marketly/drizzle/db/schemas';
import { newProductSchema, paginationSchema, updateProductSchema } from '@/schemas';
import { ApiResponse, BadRequestError, UnauthorizedError, zodValidation } from '@marketly/http';
import { logger } from '@marketly/logger';
import { getAllProductsAsVendor, getAProductDetailsAsVendor } from '@/services/product.service';
/**---------------------- VENDOR ONLY --------------------------------- */

// get all products - for vendor
export const getVendorProducts = asyncHandler(async (req, res) => {
  const { limit, page, sort } = zodValidation(paginationSchema, req.query);
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  try {
    const currentStoreProducts = await getAllProductsAsVendor(
      req.vendor.storeId,
      limit,
      page,
      sort,
    );

    res
      .status(200)
      .json(
        new ApiResponse(200, { products: currentStoreProducts }, 'Products fetched successfully'),
      );
  } catch (error) {
    logger.error(error, 'Failed to fetch products');
    throw new BadRequestError('Failed to fetch products');
  }
});

// add new product - for vendor
export const addNewProduct = asyncHandler(async (req, res) => {
  const data = zodValidation(newProductSchema, req.body);

  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  try {
    const product = await dbClient
      .insert(productTable)
      .values({
        addedById: req.vendor?.accountId,
        storeId: req.vendor?.storeId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        stock: data.stock,
        category: data.category,
        tags: data.tags,
        isAvailable: data.isAvailable,
        price: data.price,
      })
      .returning();

    res.status(200).json(new ApiResponse(200, { product }, 'Product added successfully'));
  } catch (error) {
    logger.error(error, 'Failed to add product');
    throw new BadRequestError('Failed to add product');
  }
});

// get product details - for vendor
export const getProductDetails = asyncHandler(async (req, res) => {
  const productSlug = req.params.productSlug;
  if (!productSlug) {
    throw new BadRequestError('Product ID is required');
  }
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  try {
    const product = await getAProductDetailsAsVendor(req.vendor.storeId, productSlug);

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    res.status(200).json(new ApiResponse(200, { product }, 'Product details fetched successfully'));
  } catch (error) {
    logger.error(error, 'Failed to fetch product details');
    throw new BadRequestError('Failed to fetch product details');
  }
});

// update product details - for vendor
export const updateProductDetails = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }
  const data = zodValidation(updateProductSchema, req.body);
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  try {
    const product = await dbClient.query.productTable.findFirst({
      where: and(
        eq(productTable.id, parseInt(productId)),
        eq(productTable.storeId, req.vendor?.storeId),
      ),
    });

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    const updatedProduct = await dbClient
      .update(productTable)
      .set({
        name: data.name,
        description: data.description,
        stock: data.stock,
        tags: data.tags,
        isAvailable: data.isAvailable,
        price: data.price,
      })
      .where(eq(productTable.id, product.id))
      .returning();

    res
      .status(200)
      .json(new ApiResponse(200, { product: updatedProduct }, 'Product updated successfully'));
  } catch (error) {
    logger.error(error, 'Failed to update product');
    throw new BadRequestError('Failed to update product');
  }
});

// delete product - for vendor
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  //   check is this owner or manager
  if (!['owner', 'manager'].includes(req.vendor.role)) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  try {
    const product = await dbClient.query.productTable.findFirst({
      where: and(
        eq(productTable.id, parseInt(productId)),
        eq(productTable.storeId, req.vendor?.storeId),
      ),
    });

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    await dbClient.delete(productTable).where(eq(productTable.id, product.id));

    res.status(200).json(new ApiResponse(200, {}, 'Product deleted successfully'));
  } catch (error) {
    logger.error(error, 'Failed to delete product');
    throw new BadRequestError('Failed to delete product');
  }
});

// toggle product status - for vendor
export const toggleProductStatus = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  if (!['owner', 'manager'].includes(req.vendor.role)) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  try {
    const product = await dbClient.query.productTable.findFirst({
      where: and(
        eq(productTable.id, parseInt(productId)),
        eq(productTable.storeId, req.vendor?.storeId),
      ),
    });

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    const updatedProduct = await dbClient
      .update(productTable)
      .set({
        isAvailable: !product.isAvailable,
      })
      .where(eq(productTable.id, product.id))
      .returning();

    res
      .status(200)
      .json(
        new ApiResponse(200, { product: updatedProduct }, 'Product status updated successfully'),
      );
  } catch (error) {
    logger.error(error, 'Failed to update product status');
    throw new BadRequestError('Failed to update product status');
  }
});
