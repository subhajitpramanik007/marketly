import type { IProduct, IProductsResponseMetaData, ISingleProduct } from '@/types/product.types';
import api from './api';

export const getProducts = async (): Promise<{
  products: IProduct[];
  meta: IProductsResponseMetaData;
}> => {
  const { data } = await api.get('/products');
  return data;
};

export const getSingleProduct = async (slug: string): Promise<{ product: ISingleProduct }> => {
  const { data } = await api.get(`/products/${slug}`);
  return data;
};

export const getProductsByCategory = async (
  category: string,
): Promise<{ products: IProduct[] }> => {
  const { data } = await api.get(`/products/category/${category}`);
  return data;
};
