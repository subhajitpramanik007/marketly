import { getProductsByCategory } from '@/services/products.service';
import { useQuery } from '@tanstack/react-query';

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', { category: category }],
    queryFn: () => getProductsByCategory(category),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};
