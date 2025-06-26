'use client';

import { useOnboardingStatus } from '@/hooks/onborading/useOnboardingStatus';
import { useLocalStore } from '@/hooks/useLocalStore';
import { useSession } from '@/hooks/useSession';
import { useAppInitChecks } from '@/stores/appStatus.store';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const { removeItem } = useLocalStore();

  const { data } = useOnboardingStatus();
  const { isOnboardedCheck, setIsOnboardedCheck } = useAppInitChecks();

  React.useEffect(() => {
    if (!isOnboardedCheck && data?.data.status === 'Pending' && pathname !== '/onboarding') {
      // TODO: check if the user has completed the onboarding
      //   router.push('/onboarding');

      setIsOnboardedCheck(true);
    }
  }, [data, isOnboardedCheck]);

  React.useEffect(() => {
    if (!isAuthenticated && status !== 'loading' && pathname !== '/auth/login') {
      router.push('/auth/login');
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    removeItem('session');
    // return () => {};
  }, []);

  return <>{children}</>;
}
