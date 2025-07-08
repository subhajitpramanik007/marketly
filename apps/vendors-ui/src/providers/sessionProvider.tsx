'use client';

import { useLocalStore } from '@/hooks/useLocalStore';
import { logout as logoutSession, refreshSession } from '@/services/auth.services';
import { getCurrentSessionData } from '@/services/me.services';
import { IVendor, IVendorStore } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

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
type SessionContext = Session & { logout: () => void };

export const SessionContext = React.createContext<SessionContext | undefined>(undefined);

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

  function clearSession() {
    setSession({
      status: 'Unauthenticated',
      user: null,
      store: null,
      isAuthenticated: false,
    });
    removeItem('session');
  }

  const queryClient = useQueryClient();

  const { mutateAsync: logoutMutation } = useMutation({
    mutationKey: ['session', 'logout'],
    mutationFn: logoutSession,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['session', 'refresh'],
      });
      clearSession();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  function logout() {
    toast.promise(logoutMutation(), {
      loading: 'Logging out...',
      success: 'Logged out successfully',
      error: 'Error logging out',
    });
  }

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
      clearSession();
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

  return (
    <SessionContext.Provider value={{ ...session, logout }}>{children}</SessionContext.Provider>
  );
}

SessionContext.displayName = 'SessionContext';
