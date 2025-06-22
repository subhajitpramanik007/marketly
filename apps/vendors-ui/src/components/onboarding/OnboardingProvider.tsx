'use client';

import React from 'react';

import { OnboardingStore, useOnboardingStore } from '@/stores/onboarding.store';

const OnboardingContext = React.createContext<OnboardingStore | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useOnboardingStore();

  React.useEffect(() => {
    return () => {
      store.reset();
    };
  }, []);

  return <OnboardingContext.Provider value={store}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
