import { getMeService } from '@/services/me.service';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['session', 'me'],
    queryFn: getMeService,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};
