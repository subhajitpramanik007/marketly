import type { IProduct } from '@/types/product.types';
import api from './api';
import type { IApiResponse } from '@/types/api-response.types';

export const getWishlistProducts = async (): Promise<IApiResponse<{ products: IProduct[] }>> => {
  return api.get('/consumers/wishlists');
};

export const addToWishList = async (productId: number) => {
  return api.post(`/consumers/wishlists/${productId}`);
};

export const toggeleWishlist = async (productId: number) => {
  return api.post(`/consumers/wishlists/toggle/${productId}`);
};
