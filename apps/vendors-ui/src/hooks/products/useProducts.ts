import { getProducts } from '@/services/product.services';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (page = 1) =>
  useQuery({
    queryKey: ['products', { page }],
    queryFn: () => getProducts(page),
    retry: false,
  });
