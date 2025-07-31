import React, { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import type { IOrdersMeta } from '@/types/order.types';

import { OrderCard } from '@/components/order/OrderCard';
import { SingleOrderDetails } from '@/components/order/SingleOrderDetails';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/orders';
import { Spinner } from '@/components/Spinner';

export const OrdersPage: React.FC<{
  meta: IOrdersMeta;
}> = ({ meta }) => {
  const [singleOrder, setSingleOrder] = React.useState<number | null>(null);
  const router = useRouter();

  const { loadMoreOrders, isRefetching, page, orders } = useOrders();

  // if "/orders#{id}" then show the order
  useEffect(() => {
    router.subscribe('onRendered', res => {
      const hash = res.toLocation.hash;
      if (hash) {
        const id = parseInt(hash);
        setSingleOrder(id);
      } else {
        setSingleOrder(null);
      }
    });
  }, []);

  if (singleOrder) {
    return (
      <div className="w-full justify-center items-center max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Order Details #{singleOrder}</h1>
        <SingleOrderDetails order={orders.find(order => order.id === singleOrder)} />
      </div>
    );
  }

  return (
    <div className="w-full justify-center items-center max-w-4xl mx-auto mb-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.length === 0 ? <p className="text-muted-foreground">No orders found</p> : null}

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <OrderCard key={`order-${index}`} order={order} />
        ))}
        {meta.totalPages > page ? (
          <>
            {isRefetching ? (
              <Spinner isLoading={isRefetching} />
            ) : (
              <Button onClick={loadMoreOrders} variant="link" disabled={isRefetching}>
                Load more
              </Button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
