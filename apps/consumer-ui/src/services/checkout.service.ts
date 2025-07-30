import api from './api';
import type { AxiosInstance } from 'axios';
import type { IApiResponse, ICart } from '@/types';
import type { ICheckoutSummary } from '@/types/checkout.type';

export type RazorpayData = {
  orderId: string;
  amount: number;
  currency: string;
};

export type RazorpayPaymentVerifiactionData = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

class CheckoutService {
  private apiInstance: AxiosInstance;
  private baseUrl: string = '/consumers/checkout';

  constructor(api: AxiosInstance, baseUrl?: string) {
    this.apiInstance = api;
    this.baseUrl = baseUrl || this.baseUrl;
  }

  async getSummary(cartItemIds: ICart[]): Promise<IApiResponse<ICheckoutSummary>> {
    return this.apiInstance.post(this.baseUrl + '/summary', { cartItemIds });
  }

  async processPayment(): Promise<
    IApiResponse<{
      razorpayPayment: RazorpayData;
    }>
  > {
    return this.apiInstance.post(this.baseUrl + '/process-payment');
  }

  async verifyPayment(razorpayPayment: RazorpayPaymentVerifiactionData) {
    return this.apiInstance.post(this.baseUrl + '/verify-payment', razorpayPayment);
  }
}

export const checkoutService = new CheckoutService(api, '/consumers/checkout');
