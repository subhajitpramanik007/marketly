'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
  setCurrentStep,
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

      {/* Previous */}
      {/* <CardFooter className="flex justify-between">
        <Button
          className="mt-4"
          size={'lg'}
          disabled={currentStep <= 1}
          onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
        >
          <ArrowLeft className="mr-2" />
          Previous Step
        </Button>
        <Button
          className="mt-4"
          size={'lg'}
          disabled={currentStep >= onboardingSteps.length}
          onClick={() => setCurrentStep(prev => Math.min(prev + 1, onboardingSteps.length))}
        >
          Next Step
          <ArrowRight className="ml-2" />
        </Button>
      </CardFooter> */}
    </Card>
  );
};
