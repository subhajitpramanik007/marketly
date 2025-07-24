import { refreshService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';

export const useRefreshSessionQuery = () => {
  return useQuery({
    queryKey: ['session', 'refresh'],
    queryFn: refreshService,
    refetchInterval: 1000 * 60 * 15, // Refresh every 15 minutes
  });
};
