import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggeleWishlist } from '@/services/wishlist.service';
import type { IProduct } from '@/types/product.types';
import type { IApiResponse } from '@/types/api-response.types';

export const useToggleWishlist = (productId: number, isInWishlist: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['wishlists', { productId }],
    mutationFn: () => toggeleWishlist(productId),
    onSuccess: () => {
      // Update products list
      queryClient.setQueryData(['products'], (oldData: { products: IProduct[] }) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          products: oldData.products?.map(product =>
            product.id === productId
              ? { ...product, isInWishlist: isInWishlist ? false : true }
              : product,
          ),
        };
      });

      queryClient.setQueryData(['wishlists'], (oldData: IApiResponse<{ products: IProduct[] }>) => {
        if (!oldData || !oldData.data) return oldData;

        return {
          ...oldData,
          data: {
            products: oldData.data.products?.filter(p => p.id !== productId),
          },
        };
      });

      let msg = 'The product add in your wishlist';
      if (isInWishlist) {
        msg = 'The product remove from your wishlist';
      }
      toast.success(msg);
    },
  });
};
