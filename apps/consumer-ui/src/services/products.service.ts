import type { ProductsResponseData } from '@/types/product.types';
import api from './api';

export const getProducts = async (): Promise<ProductsResponseData> => {
  const { data } = await api.get('/products');
  return data;
};
