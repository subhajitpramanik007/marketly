import { getSingleProduct } from '@/services/products.service';
import { useQuery } from '@tanstack/react-query';

export const useSingleProduct = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ['products', { slug }],
    queryFn: () => getSingleProduct(slug),
    staleTime: 5 * 60 * 1000,
  });
};
