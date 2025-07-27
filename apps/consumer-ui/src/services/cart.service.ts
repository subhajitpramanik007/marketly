import api from './api';
import type { IApiResponse, ICart, ICartWithProduct } from '@/types';

class CartService {
  private api = api;
  private baseUrl = '/consumers/carts';

  async getCartItems(): Promise<
    IApiResponse<{
      cartItems: ICartWithProduct[];
    }>
  > {
    return await this.api.get(this.baseUrl);
  }

  async addToCart(
    productId: number,
    quantity: number,
  ): Promise<
    IApiResponse<{
      cartItem: ICart;
    }>
  > {
    return this.api.post(this.baseUrl, { productId, quantity });
  }

  async chnageOfQuantityOfAItem(
    cartItemId: number,
    quantity: number,
  ): Promise<
    IApiResponse<{
      cartItem: ICart;
    }>
  > {
    return this.api.put(this.baseUrl + `/${cartItemId}`, { quantity });
  }

  async getNoOfCartItems(): Promise<
    IApiResponse<{
      count: number;
    }>
  > {
    return this.api.get(this.baseUrl + '/count');
  }

  async removeFromCart(cartItemId: number) {
    return this.api.delete(this.baseUrl + `/${cartItemId}`);
  }

  async clearCart() {
    return this.api.delete(this.baseUrl + '/clear');
  }
}

export const cartService = new CartService();
