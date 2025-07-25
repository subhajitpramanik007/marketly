import { useQuery } from '@tanstack/react-query';
import { getWishlistProducts } from '@/services/wishlist.service';

export const useWishlistProducts = () => {
  return useQuery({
    queryKey: ['wishlists'],
    queryFn: getWishlistProducts,
  });
};
