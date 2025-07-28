import { Link } from '@tanstack/react-router';

import toast from 'react-hot-toast';
import type { IProduct } from '@/types';

import { Button } from '@/components/ui/button';

import { cartService } from '@/services/cart.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddToCart = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cart', 'add', { productId }],
    mutationFn: (quantity: number = 1) => cartService.addToCart(productId, quantity),
    onSuccess: data => {
      //   toast.success('Product added to cart');

      toast(
        (t) => (
          <div>
            <span className="flex items-center gap-2">
              <p>Product added to cart</p>

              <Button variant="link" asChild onClick={() => toast.dismiss(t.id)}>
                <Link to="/cart">Go to cart</Link>
              </Button>
            </span>
          </div>
        ),
        {
          icon: '🛒',
        },
      );

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
