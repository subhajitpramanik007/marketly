import { productImageTable, productTable } from '@marketly/drizzle/db/schemas';
import { and, dbClient, eq } from '@marketly/drizzle/index';
import { BadRequestError, UnauthorizedError } from '@marketly/http/api-error';
import { ApiResponse } from '@marketly/http/api-response';
import { asyncHandler } from '@marketly/http/middleware';

// Add or update product image ids - for vendor
const addOrUpdateProductImageIds = asyncHandler(async (req, res) => {
  let { productId } = req.params;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }
  if (!['owner', 'manager'].includes(req.vendor.role)) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  let imageIds = req.body.imageIds;
  if (!imageIds && !Array.isArray(imageIds)) {
    throw new BadRequestError('Image IDs are required');
  }

  const parsedProductId = parseInt(productId, 10);

  const product = await dbClient.query.productTable.findFirst({
    where: and(
      eq(productTable.id, parsedProductId), // check if product exists
      eq(productTable.storeId, req.vendor?.storeId), // check if product belongs to store
    ),
  });

  if (!product) {
    throw new BadRequestError('Product not found');
  }

  let sequence = 0;
  const productImages = await dbClient
    .insert(productImageTable)
    .values(
      (imageIds as string[]).map(imgId => ({
        productId: product.id,
        imageId: parseInt(imgId, 10),
        isPrimary: sequence === 0,
        sequence: sequence++,
      })),
    )
    .returning();

  res
    .status(200)
    .json(new ApiResponse(200, { productImages }, 'Product images updated successfully'));
});

// set is primary
const setProductPrimaryImage = asyncHandler(async (req, res) => {
  const { productId, imgId } = req.params;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }
  if (!imgId) {
    throw new BadRequestError('Image ID is required');
  }
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }
  if (!['owner', 'manager'].includes(req.vendor.role)) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const product = await dbClient.query.productTable.findFirst({
    where: and(
      eq(productTable.id, parseInt(productId)),
      eq(productTable.storeId, req.vendor?.storeId),
    ),
  });

  if (!product) {
    throw new BadRequestError('Product not found');
  }

  await dbClient
    .update(productImageTable)
    .set({ isPrimary: false })
    .where(eq(productImageTable.productId, product.id));

  await dbClient
    .update(productImageTable)
    .set({ isPrimary: true })
    .where(eq(productImageTable.id, parseInt(imgId)));

  res.status(200).json(new ApiResponse(200, {}, 'Product image updated successfully'));
});

// update image order
const updateProductImageOrder = asyncHandler(async (req, res) => {
  const { productId, imgId, order } = req.params;

  if ([productId, imgId, order].some(item => !item || typeof item !== 'number')) {
    throw new BadRequestError('Product ID, Image ID and Order are required');
  }

  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }
  if (!['owner', 'manager'].includes(req.vendor.role)) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const product = await dbClient.query.productTable.findFirst({
    where: and(
      eq(productTable.id, parseInt(productId)),
      eq(productTable.storeId, req.vendor?.storeId),
    ),
  });

  if (!product) {
    throw new BadRequestError('Product not found');
  }

  await dbClient
    .update(productImageTable)
    .set({ order: parseInt(order as string) })
    .where(eq(productImageTable.id, parseInt(imgId as string)));

  res.status(200).json(new ApiResponse(200, {}, 'Product image updated successfully'));
});

// delete a product image
const deleteSingleImageOfProduct = asyncHandler(async (req, res) => {
  const { productId, imgId } = req.params;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }
  if (!imgId) {
    throw new BadRequestError('Image ID is required');
  }
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }
  if (!['owner', 'manager'].includes(req.vendor.role)) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const product = await dbClient.query.productTable.findFirst({
    where: and(
      eq(productTable.id, parseInt(productId)),
      eq(productTable.storeId, req.vendor?.storeId),
    ),
  });

  if (!product) {
    throw new BadRequestError('Product not found');
  }

  await dbClient.delete(productImageTable).where(eq(productImageTable.id, parseInt(imgId)));

  res.status(200).json(new ApiResponse(200, {}, 'Product image deleted successfully'));
});

// delete all product images
const deleteAllProductImages = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }
  if (!['owner', 'manager'].includes(req.vendor.role)) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const product = await dbClient.query.productTable.findFirst({
    where: and(
      eq(productTable.id, parseInt(productId)),
      eq(productTable.storeId, req.vendor?.storeId),
    ),
  });

  if (!product) {
    throw new BadRequestError('Product not found');
  }

  await dbClient.delete(productImageTable).where(eq(productImageTable.productId, product.id));

  res.status(200).json(new ApiResponse(200, {}, 'Product images deleted successfully'));
});

export {
  addOrUpdateProductImageIds,
  updateProductImageOrder,
  setProductPrimaryImage,
  deleteSingleImageOfProduct,
  deleteAllProductImages,
};
