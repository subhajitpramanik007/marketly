'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { TOnboardingStep } from '@/constants/onboarding.contants';
import React from 'react';

interface OnboardingSidebarProps {
  onboardingSteps: TOnboardingStep[];
  currentStep: number;
  completedSteps: TOnboardingStep[];
  setCurrentStep: (id: number) => void;
}

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({
  onboardingSteps,
  currentStep,
  completedSteps,
  setCurrentStep,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {onboardingSteps.map((data, index) => (
        <StepCard
          key={index}
          card={data}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onClick={id => setCurrentStep(id)}
        />
      ))}
    </div>
  );
};

interface StepCardProps {
  card: TOnboardingStep;
  currentStep: number;
  completedSteps: TOnboardingStep[];
  onClick: (id: number) => void;
}

const StepCard: React.FC<StepCardProps> = ({ card, currentStep, completedSteps, onClick }) => {
  const isCompleted = completedSteps.some(step => step.id === card.id);
  console.log(completedSteps);

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-500 ease-in-out hover:shadow-lg',
        isCompleted
          ? 'bg-emerald-400 text-emerald-900 dark:bg-emerald-600 dark:text-emerald-50'
          : currentStep !== card.id
            ? 'opacity-50 hover:shadow-none hover:scale-none cursor-not-allowed'
            : 'bg-secondary text-secondary-foreground opacity-100',
      )}
    >
      <CardContent className="flex items-center gap-4">
        {card.icon}
        <div>
          <h2 className="text-lg font-semibold">{card.title}</h2>
          <p className="text-sm">{card.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
