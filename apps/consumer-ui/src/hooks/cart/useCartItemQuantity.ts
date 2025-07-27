import { cartService } from '@/services/cart.service';
import type { ICartWithProduct, IProduct } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCartItemQuantity = (itemId: number, productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cart', 'itemCounts'],
    mutationFn: (quantity: number) => cartService.chnageOfQuantityOfAItem(itemId, quantity),
    onSuccess: data => {
      //   set data in query cart
      queryClient.setQueryData(['cart'], (oldData: { data: { cartItems: ICartWithProduct[] } }) => {
        if (!oldData) return oldData;
        const updatedCartItems = oldData.data.cartItems.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: data.data.cartItem.quantity,
            };
          }
          return item;
        });

        return {
          ...oldData,
          data: {
            ...oldData.data,
            cartItems: updatedCartItems,
          },
        };
      });

      //   set data in products query
      queryClient.setQueryData(['products'], (productData: { products: IProduct[] }) => {
        if (!productData) return productData;

        const updatedProducts = productData.products.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              cart: {
                ...product.cart,
                quantity: data.data.cartItem.quantity,
              },
            };
          }
          return product;
        });

        return {
          ...productData,
          products: updatedProducts,
        };
      });
    },
  });
};
