import { addToWishList } from '@/services/wishlist.service';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useProductAddToWishlist = () => {
  return useMutation({
    mutationKey: ['wishlists', 'add'],
    mutationFn: addToWishList,
    onSuccess() {
      toast.success('Product add your wishlist');
    },
    onError(err: any) {
      toast.error(err?.message || err || 'Failed to add wishlist');
    },
  });
};
