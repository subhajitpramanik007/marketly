import { orderService } from '@/services/order.service';
import type { IOrder, TOrderStatus } from '@/types/order.types';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

export const useOrders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState<TOrderStatus | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);

  function loadMoreOrders() {
    setPage(page + 1);
  }

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['orders', { page, limit, status }],
    queryFn: () => {
      return orderService.getOrders(page, limit, status);
    },
    select: data => {
      return data.data;
    },
  });

  React.useEffect(() => {
    if (data) {
      setOrders(prev => [...prev, ...data.orders]);
    }
  }, [data]);

  return {
    page,
    setPage,
    limit,
    setLimit,
    status,
    setStatus,
    data,
    orders,
    loadMoreOrders,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
