'use client';

import { useLocalStore } from '@/hooks/useLocalStore';
import { refreshSession } from '@/services/auth.services';
import { getCurrentSessionData } from '@/services/me.services';
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
  user: any;
  store: any;
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
    select: data => {
      console.log(data);
      return data;
    },
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { setItem, removeItem } = useLocalStore();

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

  let session: Session = {
    status: 'loading',
    user: null,
    store: null,
    isAuthenticated: false,
  };

  if (sessionQuery.isSuccess) {
    session = {
      status: 'Authenticated',
      user: sessionQuery.data.data.user,
      store: sessionQuery.data.data.store,
      isAuthenticated: true,
    };
  }

  if (sessionQuery.isError) {
    session = {
      status: 'Unauthenticated',
      user: null,
      store: null,
      isAuthenticated: false,
    };
  }

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

SessionContext.displayName = 'SessionContext';
