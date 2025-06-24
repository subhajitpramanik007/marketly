'use client';

import React from 'react';
import {
  OnboardingCompleted,
  OnboardingContent,
  OnboardingHeader,
  OnboardingSidebar,
  OnboardingSkeleton,
  useOnboarding,
} from '@/components/onboarding';
import { ONBOARDING_STEPS, TOnboardingStep } from '@/constants/onboarding.contants';

import {
  AddStoreInfo,
  AddPersonalInfo,
  AddAddress,
  AddPaymentMethods,
  AddLogo,
  AddFirstProducts,
} from '@/components/onboarding';
import { useOnboardingStatus } from '@/hooks/onborading/useOnboardingStatus';

export const OnboardingStepComponents: Record<TOnboardingStep['id'], React.ReactNode> = {
  1: <AddPersonalInfo />,
  2: <AddStoreInfo />,
  3: <AddAddress />,
  4: <AddPaymentMethods />,
  5: <AddLogo />,
  6: <AddFirstProducts />,
};

export default function OnboardingPage() {
  const { currentStep, completedStep, setCurrentStep, setCompletedStep } = useOnboarding();
  const [isOnboardingCompleted, setIsOnboardingCompleted] = React.useState(false);

  const { data, isPending, isLoading } = useOnboardingStatus();

  React.useEffect(() => {
    if (completedStep.length === ONBOARDING_STEPS.length) {
      setIsOnboardingCompleted(true);
    }
  }, [completedStep]);

  React.useEffect(() => {
    if (data?.data.status === 'Completed') {
      setIsOnboardingCompleted(true);
    }

    if (data?.data.status === 'Pending') {
      setIsOnboardingCompleted(false);

      const pendingStepsTitle = data.data.onboardingSteps;
      const completedSteps = ONBOARDING_STEPS.filter(
        step => !pendingStepsTitle.includes(step.title),
      );
      completedSteps.forEach(step => setCompletedStep(step.title));
      setCurrentStep(completedSteps.length + 1);
    }
  }, [data]);

  if (isPending || isLoading) {
    return <OnboardingSkeleton />;
  }

  return (
    <div className="flex w-full max-w-7xl">
      <div className="flex w-full flex-col p-3 rounded-md">
        <OnboardingHeader />

        <div className="flex gap-6 py-4">
          <OnboardingSidebar
            onboardingSteps={[...ONBOARDING_STEPS]}
            currentStep={currentStep}
            completedSteps={completedStep}
            setCurrentStep={setCurrentStep}
          />
          <div className="flex-1">
            {isOnboardingCompleted ? (
              <OnboardingCompleted />
            ) : (
              <OnboardingContent
                onboardingSteps={[...ONBOARDING_STEPS]}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              >
                {OnboardingStepComponents[ONBOARDING_STEPS[currentStep - 1].id]}
              </OnboardingContent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
