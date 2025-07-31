import type { AxiosInstance } from 'axios';
import api from './api';
import type { IOrdersResponse } from '@/types/order.types';

class OrderService {
  private apiInstance: AxiosInstance;
  private baseUrl: string;
  constructor(apiInstance: AxiosInstance, baseUrl = '/consumers/orders') {
    this.apiInstance = apiInstance;
    this.baseUrl = baseUrl;
  }

  async getOrders(page = 1, limit = 10, status: string | null = null): Promise<IOrdersResponse> {
    return this.apiInstance.get(this.baseUrl + `?page=${page}&limit=${limit}&status=${status}`);
  }

  async getSingleOrder(id: number) {
    return this.apiInstance.get(`${this.baseUrl}/${id}`);
  }

  async cancelOrder(id: number) {
    return this.apiInstance.post(`${this.baseUrl}/${id}/cancel`);
  }
}

export const orderService = new OrderService(api, '/consumers/orders');
