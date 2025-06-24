'use client';

import { getOnboardingStatus } from '@/services/onboarding.services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '../useSession';

export const useOnboardingStatus = () => {
  const { isAuthenticated } = useSession();
  return useQuery({
    queryKey: ['onboarding', 'status'],
    queryFn: getOnboardingStatus,
    enabled: isAuthenticated,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
