import { cartService } from '@/services/cart.service';
import type { IProduct } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

export const useDeleteItemFromCart = (itemId: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync: removeFromCart, isPending } = useMutation({
    mutationKey: ['cart', 'delete'],
    mutationFn: () => cartService.removeFromCart(itemId),
    onSuccess: () => {
      // Invalidate the cart items query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['cart'], exact: true, refetchType: 'active' });
      queryClient.invalidateQueries({
        queryKey: ['cart', 'count'],
        refetchType: 'active',
        exact: true,
      });

      //   Update products cache
      queryClient.setQueryData(['products'], (oldData: { products: IProduct[] }) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          products: oldData.products?.map(product =>
            product.cart?.id === itemId
              ? {
                  ...product,
                  cart: null, // Remove the cart reference from the product
                }
              : product,
          ),
        };
      });

      toast.success('Item removed from cart successfully');
    },
    onError: error => {
      toast.error(error.message || 'Failed to remove item from cart');
    },
  });

  return { removeFromCart, isPending };
};
