import { getProducts } from '@/services/products.service';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    retry: false,
    staleTime: Infinity,
  });
};
