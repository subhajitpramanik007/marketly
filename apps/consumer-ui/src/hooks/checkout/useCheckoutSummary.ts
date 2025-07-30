import { checkoutService } from '@/services/checkout.service';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from '@tanstack/react-router';

export const useCheckoutSummary = () => {
  const { checkoutItems } = useLoaderData({ from: '/_user/checkout' });

  return useQuery({
    queryKey: ['checkout', 'summary'],
    queryFn: () => checkoutService.getSummary(checkoutItems),
    staleTime: 0,
    enabled: checkoutItems.length > 0,
  });
};
