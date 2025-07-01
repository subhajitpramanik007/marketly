import api from './axios';
import { ApiResponse, IProduct } from '@/types';

import { NewProductSchema, UpdateProductSchema } from '@/schemas/product.schemas';

export const getProducts = (
  page = 1,
  limit = 10,
): Promise<ApiResponse<{ products: IProduct[] }>> => {
  return api.get(`/products/me?page=${page}&limit=${limit}`);
};

export const addNewProduct = (
  data: NewProductSchema,
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.post('/products', data);
};

export const updateProduct = (
  id: string | number,
  data: UpdateProductSchema,
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.patch(`/products/${id}`, data);
};

export const getProductDetails = (slug: string): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.get(`/products/${slug}/details`);
};

export const changeProductStatus = (
  id: number,
  data: { isAvailable: boolean },
): Promise<ApiResponse<{ product: IProduct }>> => {
  return api.patch(`/products/${id}`, data);
};

export const deleteProduct = (id: number) => {
  return api.delete(`/products/${id}`);
};
