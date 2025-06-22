'use client';

import React from 'react';
import {
  OnboardingContent,
  OnboardingHeader,
  OnboardingSidebar,
  useOnboarding,
} from '@/components/onboarding';
import { ONBOARDING_STEPS, OnboardingStepComponents } from '@/constants/onboarding.contants';

export default function OnboardingPage() {
  const { currentStep, completedStep, setCurrentStep, setCompletedStep } = useOnboarding();

  return (
    <div className="flex w-full max-w-7xl">
      <div className="flex w-full flex-col p-3 rounded-md">
        <OnboardingHeader />

        <div className="flex gap-6 py-4">
          <OnboardingSidebar
            onboardingSteps={[...ONBOARDING_STEPS]}
            currentStep={currentStep}
            completedStep={completedStep}
            setCurrentStep={setCurrentStep}
          />
          <div className="flex-1 ">
            <OnboardingContent
              onboardingSteps={[...ONBOARDING_STEPS]}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            >
              {OnboardingStepComponents[ONBOARDING_STEPS[currentStep - 1].id]}
            </OnboardingContent>
          </div>
        </div>
      </div>
    </div>
  );
}
