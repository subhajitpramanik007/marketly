import { NewProductSchema, UpdateProductSchema } from '@/schemas/product.schemas';
import api from './axios';

export const getProducts = (page = 1, limit = 10, search = '') => {
  return api.get(`/vendors/products?page=${page}&limit=${limit}&search=${search}`);
};

export const addNewProduct = (data: NewProductSchema) => {
  return api.post('/vendors/products', data);
};

export const updateProduct = (id: string, data: UpdateProductSchema) => {
  return api.put(`/vendors/products/${id}`, data);
};

export const getProduct = (id: string) => {
  return api.get(`/vendors/products/${id}`);
};

export const changeProductStatus = (id: string, data: { isAvailable: boolean }) => {
  return api.patch(`/vendors/products/${id}`, data);
};

export const deleteProduct = (id: string) => {
  return api.delete(`/vendors/products/${id}`);
};
