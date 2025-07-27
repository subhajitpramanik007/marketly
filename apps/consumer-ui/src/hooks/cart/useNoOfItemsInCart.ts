import { cartService } from '@/services/cart.service';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '../auth';

export const useNoOfItemsInCart = () => {
  const { isAuthenticated } = useSession();

  return useQuery({
    queryKey: ['cart', 'count'],
    queryFn: () => cartService.getNoOfCartItems(),
    select(data) {
      return data.data.count ?? 0;
    },
    enabled: isAuthenticated,
  });
};
