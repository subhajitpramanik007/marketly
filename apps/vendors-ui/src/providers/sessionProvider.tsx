'use client';

import { refreshSession } from '@/services/auth.services';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export const SessionContext = React.createContext({});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { mutate: sessionRefresh } = useMutation({
    mutationKey: ['session', 'refresh'],
    mutationFn: refreshSession,
    onSuccess: () => {
      console.log('session refreshed');
    },
    onError: () => {
      console.log('session refresh failed');
    },
  });

  useEffect(() => {
    sessionRefresh();

    const interval = setInterval(() => {
      sessionRefresh();
    }, 900_000);

    return () => clearInterval(interval);
  }, [sessionRefresh]);

  return <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>;
}
