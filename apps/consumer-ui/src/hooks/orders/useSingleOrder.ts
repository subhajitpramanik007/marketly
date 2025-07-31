import { orderService } from '@/services/order.service';
import { useQuery } from '@tanstack/react-query';

export const useSingleOrder = (id: number) => {
  return useQuery({
    queryKey: ['order', { id }],
    queryFn: () => orderService.getSingleOrder(id),
  });
};
