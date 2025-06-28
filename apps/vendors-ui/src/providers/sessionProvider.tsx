'use client';

import { useLocalStore } from '@/hooks/useLocalStore';
import { refreshSession } from '@/services/auth.services';
import { getCurrentSessionData } from '@/services/me.services';
import { IVendor, IVendorStore } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

interface InitialSession {
  status: 'loading';
  user: null;
  store: null;
  isAuthenticated: false;
}

interface AuthSession {
  status: 'Authenticated';
  user: IVendor;
  store: IVendorStore;
  isAuthenticated: true;
}

interface UnAuthSession {
  status: 'Unauthenticated';
  user: null;
  store: null;
  isAuthenticated: false;
}

type Session = InitialSession | AuthSession | UnAuthSession;

export const SessionContext = React.createContext<Session | undefined>(undefined);

function useCurrentSession() {
  const { getItem } = useLocalStore();
  const isAuthenticated = !!getItem<{ isAuthenticated: boolean }>('session')?.isAuthenticated;

  return useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSessionData,
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { setItem, removeItem } = useLocalStore();
  const [session, setSession] = React.useState<Session>({
    status: 'loading',
    user: null,
    store: null,
    isAuthenticated: false,
  });

  const { mutateAsync: sessionRefresh, isSuccess } = useMutation({
    mutationKey: ['session', 'refresh'],
    mutationFn: refreshSession,
    onSuccess: () => {
      console.log('session refreshed');
      setItem('session', {
        isAuthenticated: true,
        lastRefreshedAt: Date.now(),
      });
    },
    onError: () => {
      console.log('session refresh failed');

      setSession({
        status: 'Unauthenticated',
        user: null,
        store: null,
        isAuthenticated: false,
      });
      removeItem('session');
    },
  });

  const sessionQuery = useCurrentSession();

  useEffect(() => {
    sessionRefresh();

    const interval = setInterval(() => {
      sessionRefresh();
    }, 900_000);

    return () => clearInterval(interval);
  }, [sessionRefresh]);

  useEffect(() => {
    if (isSuccess) {
      setSession({
        status: 'Authenticated',
        user: sessionQuery.data?.data.user,
        store: sessionQuery.data?.data.store,
        isAuthenticated: true,
      });
    }
  }, [isSuccess, sessionQuery.data?.data]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

SessionContext.displayName = 'SessionContext';
