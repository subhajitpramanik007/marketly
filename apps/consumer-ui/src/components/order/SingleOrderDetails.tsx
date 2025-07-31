'use client';

import type { IOrder } from '@/types/order.types';
import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '../ui/card';
import { OrderStatus } from './OrderStatus';
import { Image } from '../Image';
import { formatPrice } from '@/lib/utils';

export const SingleOrderDetails: React.FC<{
  order?: IOrder;
}> = ({ order }) => {
  if (!order) {
    return (
      <div>
        <p>No order found</p>
      </div>
    );
  }

  const { id, createdAt, items, payment, status } = order;

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4">
          <CardTitle>Order #{id}</CardTitle>
          <OrderStatus status={status} />
        </div>
        <CardDescription>{new Date(createdAt).toLocaleString()}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <div key={item.id} className="flex gap-4">
              <Image
                className="w-32 aspect-square object-cover rounded-md"
                href={item.imageUrl}
                alt={item.name}
              />
              <div className="flex flex-col">
                <h3 className="font-semibold">{item.name}</h3>
                <p>Qty: {item.quantity}</p>
                <p>Price per unit: {formatPrice(item.priceAtPurchase)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col gap-2">
          <p className="space-x-2">
            <span>Payment Method :</span>
            <span className="font-semibold">{payment.method}</span>
          </p>
          <p className="space-x-2">
            <span>Payment Status :</span>
            <span className="font-semibold">{payment.status}</span>
          </p>
          <p className="space-x-2">
            <span>Payment Amount :</span>
            <span className="font-semibold">{formatPrice(payment.amount)}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
