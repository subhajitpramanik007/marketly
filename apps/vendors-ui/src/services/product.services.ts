import api from './axios';
import { ApiResponse, IImage, IProduct, IProductImage } from '@/types';

import { NewProductSchema, UpdateProductSchema } from '@/schemas/product.schemas';

const getProducts = (page = 1, limit = 10): Promise<ApiResponse<{ products: IProduct[] }>> => {
  return api.get(`/products/me?page=${page}&limit=${limit}`);
};

const addNewProduct = (data: NewProductSchema): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.post('/products', data);
};

const updateProduct = (
  id: number,
  data: UpdateProductSchema,
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.patch(`/products/${id}`, data);
};

const getProductDetails = (slug: string): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.get(`/products/${slug}/details`);
};

const changeProductStatus = (
  id: number,
  data: { isAvailable: boolean },
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.patch(`/products/${id}`, data);
};

const deleteProduct = (id: number) => {
  return api.delete(`/products/${id}`);
};

// Add product images
const addProductImage = (
  productId: number,
  data: { imageIds: IImage['id'][] },
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.post(`/products/${productId}/images`, data);
};

// Update or add product images
const updateImagesOfProduct = (
  productId: number,
  data: { imageIds: IImage['id'][] },
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.patch(`/products/${productId}/images`, data);
};

// Update image order
const updateProductImageOrder = (
  productId: number,
  imageId: IProductImage['id'],
  order: number,
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.patch(`/products/${productId}/images/${imageId}/order/${order}`);
};

// set is primary image
const setPrimaryImageOfProduct = (
  productId: number,
  imageId: IProductImage['id'],
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.patch(`/products/${productId}/images/${imageId}/is-primary`);
};

// delete product image
const deleteSingleImageOfProduct = (productId: number, imageId: IProductImage['id']) => {
  return api.delete(`/products/${productId}/images/${imageId}`);
};

// delete all product images
const deleteAllImagesOfProduct = (productId: number) => {
  return api.delete(`/products/${productId}/images`);
};

export {
  getProducts,
  addNewProduct,
  updateProduct,
  getProductDetails,
  changeProductStatus,
  deleteProduct,
  addProductImage,
  updateImagesOfProduct,
  updateProductImageOrder,
  setPrimaryImageOfProduct,
  deleteSingleImageOfProduct,
  deleteAllImagesOfProduct,
};
