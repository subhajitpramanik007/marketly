import {
  productParamsSchema,
  productsByCategoryParamsSchema,
  productsByCategoryQuerySchema,
  productsBySearchQuerySchema,
  productsByTagBodySchema,
  productsByTagQuerySchema,
  productsQuerySchema,
} from '@/schemas';
import { asyncHandler } from '@marketly/http/middleware';
import { zodValidation } from '@marketly/http/validation';

import {
  getNoOfProductsQuery,
  getProductBySlug,
  getProductsQuery,
} from '@/services/product.consumer.service';
import { ApiResponse } from '@marketly/http/api-response';

// getProducts
const getProducts = asyncHandler(async (req, res) => {
  const options = zodValidation(productsQuerySchema, req.query);

  const noOfProducts = await getNoOfProductsQuery(options);

  //   if no of products is 0, return empty array
  if (noOfProducts == 0) {
    res.status(200).json(new ApiResponse(200, { products: [] }, 'No products found'));
    return;
  }

  const products = await getProductsQuery(options, req.user?.id);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        meta: {
          noOfProducts,
          noOfPages: Math.ceil(noOfProducts / options.limit),
          currentPage: options.page,
          limit: options.limit,
        },
      },
      'Products fetched successfully',
    ),
  );
});

// getProductsByCategory
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = zodValidation(productsByCategoryParamsSchema, req.params);

  const options = zodValidation(productsByCategoryQuerySchema, req.query);

  const noOfProducts = await getNoOfProductsQuery({ ...options, category });

  //   if no of products is 0, return empty array
  if (noOfProducts == 0) {
    res.status(200).json(new ApiResponse(200, { products: [] }, 'No products found'));
    return;
  }

  const products = await getProductsQuery({ ...options, category });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        meta: {
          noOfProducts,
          noOfPages: Math.ceil(noOfProducts / options.limit),
          currentPage: options.page,
          limit: options.limit,
        },
      },
      'Products fetched successfully',
    ),
  );
});

// getProductsByTags
const getProductsByTags = asyncHandler(async (req, res) => {
  const { tags } = zodValidation(productsByTagBodySchema, req.body);

  const options = zodValidation(productsByTagQuerySchema, req.query);

  const noOfProducts = await getNoOfProductsQuery({ ...options, tags });

  //   if no of products is 0, return empty array
  if (noOfProducts == 0) {
    res.status(200).json(new ApiResponse(200, { products: [] }, 'No products found'));
    return;
  }

  const products = await getProductsQuery({ ...options, tags });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        meta: {
          noOfProducts,
          noOfPages: Math.ceil(noOfProducts / options.limit),
          currentPage: options.page,
          limit: options.limit,
        },
      },
      'Products fetched successfully',
    ),
  );
});

// getProductsBySearch
const getProductsBySearch = asyncHandler(async (req, res) => {
  const options = zodValidation(productsBySearchQuerySchema, req.query);

  const noOfProducts = await getNoOfProductsQuery(options);

  //   if no of products is 0, return empty array
  if (noOfProducts == 0) {
    res.status(200).json(new ApiResponse(200, { products: [] }, 'No products found'));
    return;
  }

  const products = await getProductsQuery(options);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        meta: {
          noOfProducts,
          noOfPages: Math.ceil(noOfProducts / options.limit),
          currentPage: options.page,
          limit: options.limit,
        },
      },
      'Products fetched successfully',
    ),
  );
});

// getProduct
const getProduct = asyncHandler(async (req, res) => {
  const { slug } = zodValidation(productParamsSchema, req.params);

  const product = await getProductBySlug(slug);

  res.status(200).json(new ApiResponse(200, { product }, 'Product fetched successfully'));
});

export { getProducts, getProductsByCategory, getProductsByTags, getProductsBySearch, getProduct };
