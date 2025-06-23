'use client';

import React from 'react';
import { useOnboarding } from './OnboardingProvider';
import { OnboardFormActions } from './OnboardFormActions';

export const AddFirstProducts = () => {
  const { currentStep, setCompletedStep } = useOnboarding();

  return (
    <div className="space-y-6 flex flex-col w-full h-full justify-between">
      <div></div>

      <OnboardFormActions
        key={currentStep}
        isShowSkip
        onSkip={() => {
          setCompletedStep('Add your First Products');
        }}
        onNext={() => {
          setCompletedStep('Add your First Products');
        }}
      />
    </div>
  );
};
