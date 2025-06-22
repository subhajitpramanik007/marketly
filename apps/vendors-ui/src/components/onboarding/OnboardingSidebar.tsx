'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { TOnboardingStep } from '@/constants/onboarding.contants';
import React from 'react';

interface OnboardingSidebarProps {
  onboardingSteps: TOnboardingStep[];
  currentStep: number;
  completedStep: number | null;
  setCurrentStep: (id: number) => void;
}

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({
  onboardingSteps,
  currentStep,
  completedStep,
  setCurrentStep,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {onboardingSteps.map((data, index) => (
        <StepCard
          key={index}
          card={data}
          currentStep={currentStep}
          completedStep={completedStep}
          onClick={id => setCurrentStep(id)}
        />
      ))}
    </div>
  );
};

interface StepCardProps {
  card: TOnboardingStep;
  currentStep: number;
  completedStep: number | null;
  onClick: (id: number) => void;
}

const StepCard: React.FC<StepCardProps> = ({ card, currentStep, completedStep, onClick }) => {
  const isCompleted =
    (completedStep !== null && completedStep >= card.id) || currentStep === card.id;

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-500 ease-in-out hover:scale-[1.01] hover:shadow-lg',
        !isCompleted
          ? 'opacity-50 hover:shadow-none hover:scale-none cursor-not-allowed'
          : currentStep === card.id
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground',
      )}
      onClick={() => isCompleted && onClick(card.id)}
    >
      <CardContent className="flex items-center gap-4">
        {card.icon}
        <div>
          <h2 className="text-lg font-semibold">{card.title}</h2>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
