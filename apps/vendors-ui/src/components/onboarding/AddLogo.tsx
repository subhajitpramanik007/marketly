'use client';

import React from 'react';
import { OnboardFormActions } from './OnboardFormActions';
import { useOnboarding } from './OnboardingProvider';

export const AddLogo = () => {
  const { currentStep, setCurrentStep, setCompletedStep } = useOnboarding();

  return (
    <div className="space-y-6 flex flex-col w-full h-full justify-between">
      <div></div>

      <OnboardFormActions
        key={currentStep}
        onNext={() => {
          setCompletedStep('Add your Logo');
          setCurrentStep(currentStep + 1);
        }}
      />
    </div>
  );
};
