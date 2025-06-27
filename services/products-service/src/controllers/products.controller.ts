import { asyncHandler } from '@marketly/http';
import { and, asc, dbClient, desc, eq, placeholder } from '@marketly/drizzle/index';
import { productImageTable, productTable } from '@marketly/drizzle/db/schemas';
import { newProductSchema, paginationSchema, updateProductSchema } from '@/schemas';
import { ApiResponse, BadRequestError, UnauthorizedError, zodValidation } from '@marketly/http';

// get all products - for public
export const getProducts = asyncHandler(async (req, res) => {
  const { limit, page, sort } = zodValidation(paginationSchema, req.query);

  try {
    const products = await dbClient.query.productTable.findMany({
      limit: limit,
      offset: (page - 1) * limit,
      orderBy: [sort === 'asc' ? asc(productTable.createdAt) : desc(productTable.createdAt)],
      with: {
        images: {
          where: eq(productImageTable.isPrimary, true),
          limit: 1,
        },
      },
    });

    res.status(200).json(new ApiResponse(200, { products }, 'Products fetched successfully'));
  } catch (error) {
    throw new BadRequestError('Failed to fetch products');
  }
});

// get a product - for public
export const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }

  try {
    const product = await dbClient.query.productTable.findFirst({
      where: eq(productTable.id, parseInt(productId)),
      with: {
        images: true,
        store: {
          columns: {
            id: true,
            storeName: true,
            createdAt: true,
            isVerified: true,
          },
          with: {
            storeLogo: true,
          },
        },
      },
    });

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    res.status(200).json(new ApiResponse(200, { product }, 'Product fetched successfully'));
  } catch (error) {
    throw new BadRequestError('Failed to fetch product');
  }
});

/**---------------------- VENDOR ONLY --------------------------------- */

// get all products - for vendor
export const getVendorProducts = asyncHandler(async (req, res) => {
  const { limit, page, sort } = zodValidation(paginationSchema, req.query);
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  try {
    const currentStoreProducts = await dbClient.query.productTable.findMany({
      where: eq(productTable.storeId, req.vendor?.storeId),
      limit: limit,
      offset: (page - 1) * limit,
      orderBy: [sort === 'asc' ? asc(productTable.createdAt) : desc(productTable.createdAt)],
      with: {
        addedBy: true,
        images: {
          where: eq(productImageTable.isPrimary, true),
          limit: 1,
        },
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, { products: currentStoreProducts }, 'Products fetched successfully'),
      );
  } catch (error) {
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
    throw new BadRequestError('Failed to add product');
  }
});

// get product details - for vendor
export const getProductDetails = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    throw new BadRequestError('Product ID is required');
  }
  if (!req.vendor) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  try {
    const product = await dbClient.query.productTable.findFirst({
      where: and(
        eq(productTable.id, parseInt(productId)),
        eq(productTable.storeId, req.vendor?.storeId),
      ),
      with: {
        addedBy: true,
        images: true,
      },
    });

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    res.status(200).json(new ApiResponse(200, { product }, 'Product details fetched successfully'));
  } catch (error) {
    throw new BadRequestError('Failed to fetch product details');
  }
});

// update product details - for vendor
export const updateProductDetails = asyncHandler(async (req, res) => {
  const productId = req.params.id;
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
    throw new BadRequestError('Failed to update product');
  }
});

// delete product - for vendor
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
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
    throw new BadRequestError('Failed to update product status');
  }
});
