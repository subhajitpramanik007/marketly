import { cartService } from '@/services/cart.service';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '../auth';

export const useCartItems = () => {
  const { isAuthenticated } = useSession();

  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCartItems(),
    enabled: isAuthenticated,
  });
};
