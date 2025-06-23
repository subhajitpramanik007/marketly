'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TOnboardingStep } from '@/constants/onboarding.contants';
import { cn } from '@/lib/utils';

interface OnboardingContentProps {
  onboardingSteps: TOnboardingStep[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  children: React.ReactNode;
  className?: string;
}

export const OnboardingContent: React.FC<OnboardingContentProps> = ({
  onboardingSteps,
  currentStep,
  children,
  className = '',
}) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          Step {currentStep} : {onboardingSteps[currentStep - 1].title}
        </CardTitle>
        <CardDescription>{onboardingSteps[currentStep - 1].description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <React.Suspense fallback={<div>Something went wrong</div>}>
          <div className={cn('flex flex-col gap-4 w-full h-full', className)}>{children}</div>
        </React.Suspense>
      </CardContent>
    </Card>
  );
};
