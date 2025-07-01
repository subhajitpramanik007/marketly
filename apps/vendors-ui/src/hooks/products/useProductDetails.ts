'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from '@/services/product.services';

export const useProductDetails = (slug: string) =>
  useQuery({
    queryKey: ['products', { slug }],
    queryFn: () => getProductDetails(slug),
    retry: false,
  });
