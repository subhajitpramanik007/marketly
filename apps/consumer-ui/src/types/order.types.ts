import type { IApiResponse } from './api-response.types';

export interface IOrdersResponse
  extends IApiResponse<{
    orders: IOrder[];
    meta: IOrdersMeta;
  }> {}

export interface ISingleOrderResponse extends IApiResponse<{ order: IOrder }> {}

export interface IOrdersMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type TOrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrder {
  id: number;
  status: TOrderStatus;
  createdAt: Date;
  updatedAt: Date;
  payment: IOrderPayment;
  items: IOrderItem[];
}

export interface IOrderItem {
  id: number;
  quantity: number;
  priceAtPurchase: string;
  productId: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  storeName: string;
  storeId: number;
}

export interface IOrderPayment {
  id: number;
  status: string;
  method: string;
  provider: string;
  amount: string;
  currency: string;
  paidAt: Date | null;
}
