import { orderService } from '@/services/order.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useOrderCancel = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['order', 'cancel', { id }],
    mutationFn: () => orderService.cancelOrder(id),
    onSuccess: () => {
      toast.success('Order cancelled successfully');

      // invalidate queries
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === 'orders';
        },
      });
    },
    onError: () => {
      toast.error('Failed to cancel order');
    },
  });
};
