import { cartService } from '@/services/cart.service';
import type { IProduct } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useAddToCart = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cart', 'add', { productId }],
    mutationFn: (quantity: number = 1) => cartService.addToCart(productId, quantity),
    onSuccess: data => {
      toast.success('Product added to cart');

      const cartItem = data.data.cartItem;
      if (!cartItem) return;

      //   add to products cache
      queryClient.setQueryData(['products'], (oldData: { products: IProduct[] }) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          products: oldData.products?.map(product =>
            product.id === productId
              ? {
                  ...product,
                  cart: cartItem,
                }
              : product,
          ),
        };
      });

      //  add to cart invalidate
      queryClient.invalidateQueries({ queryKey: ['cart'], exact: true });
      queryClient.invalidateQueries({ queryKey: ['cart', 'count'], exact: true });
    },
    onError: err => {
      toast.error(err.message ?? 'Failed to add cart, try again later');
    },
  });
};
