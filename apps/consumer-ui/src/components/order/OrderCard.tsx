import * as React from 'react';
import type { IOrder } from '@/types/order.types';

import { OrderStatus } from './OrderStatus.tsx';
import { useRouter } from '@tanstack/react-router';

import { cn, formatPrice } from '@/lib/utils.ts';
import { Image } from '../Image.tsx';
import { Button } from '../ui/button.tsx';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderCardProps {
  order: IOrder;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { navigate } = useRouter();

  const { id, status, createdAt, payment, items } = order;

  function handleOrderClick() {
    navigate({ to: `/orders#${id}` });
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const images = items.map(item => item.imageUrl).slice(0, 3);
  const name = items
    .map(item => item.name)
    .slice(0, 3)
    .join(', ');

  return (
    <Card className="flex flex-col w-full max-w-4xl">
      <CardHeader className="flex w-full justify-between items-center gap-2">
        <div className="flex gap-2">
          <CardTitle className="flex gap-2">
            <span>Order</span>
            <span
              onClick={handleOrderClick}
              className="font-semibold cursor-pointer hover:underline"
            >
              #{id}
            </span>
          </CardTitle>

          <OrderStatus status={status} />
        </div>
        <div className="text-sm text-muted-foreground">{new Date(createdAt).toDateString()}</div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row w-full justify-between gap-2">
          {/* Items */}
          <div className="flex gap-4 max-w-2xl">
            <div className="min-h-[7rem]">
              <div className="w-24">
                {images.map((image, idx) => (
                  <div key={`${name}-image-${idx}`} className="relative">
                    <Image
                      href={image}
                      className={cn(
                        'w-24 aspect-square absolute rounded-sm border border-orange-200',
                        images.length > 2 && idx === 0 && 'z-10 rotate-15',
                        idx === 1 && 'z-20 -rotate-15',
                        idx === 2 && 'z-30',
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="line-clamp-2">
              <span className="font-semibold">{name}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col gap-2">
            <div className="text-sm space-x-2">
              <span>Payment Method :</span>
              <span className="font-semibold">{payment.method}</span>
            </div>
            <div className="text-sm space-x-2">
              <span>Payment Status:</span>
              <span className="font-semibold">{payment.status}</span>
            </div>
            <div className="text-sm space-x-2">
              <span>Total Items:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="text-sm space-x-2">
              <span>Total Price:</span>
              <span className="font-semibold">{formatPrice(payment.amount)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="link" onClick={() => navigate({ to: `/orders#${id}` })}>
          View Order
        </Button>
      </CardFooter>
    </Card>
  );
};
