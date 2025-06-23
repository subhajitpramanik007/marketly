import * as React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, TPersonalInfoSchema } from '@/schemas/onboarding.schama';
import { useOnboarding } from '@/components/onboarding';

export const usePersonalInfo = () => {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const { currentStep, setCurrentStep, setCompletedStep, data, setData } = useOnboarding();

  const form = useForm<TPersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      ...data['Add Personal Info'],
    },
  });

  const onSubmit = (data: TPersonalInfoSchema) => {
    setData('Add Personal Info', data);
    setIsCompleted(true);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (isCompleted || form.formState.isValid) {
      setIsCompleted(true);
      setCurrentStep(currentStep + 1);
      setCompletedStep("Add Personal Info");
    } else {
      setIsCompleted(false);
    }
  };

  return {
    form,
    isCompleted,
    isSubmitted,
    handleNext,
    onSubmit,
  };
};
