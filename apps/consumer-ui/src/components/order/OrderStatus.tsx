import * as React from 'react';
import type { IOrder } from '@/types/order.types';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

const statusMap: Record<IOrder['status'], { color: string }> = {
  pending: { color: 'bg-yellow-500' },
  processing: { color: 'bg-blue-500' },
  shipped: { color: 'bg-green-500' },
  delivered: { color: 'bg-green-700' },
  cancelled: { color: 'bg-red-500' },
} as const;

export const OrderStatus: React.FC<{
  status: IOrder['status'];
}> = ({ status }) => {
  return <Badge className={cn(statusMap[status].color, 'capitalize')}>{status}</Badge>;
};
