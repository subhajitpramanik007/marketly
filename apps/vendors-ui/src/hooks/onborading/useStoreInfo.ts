import * as React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addStoreOnboardingSchema, TAddStoreOnboardingSchema } from '@/schemas/onboarding.schama';
import { useOnboarding } from '@/components/onboarding';
import { useDebounce } from '@/hooks/useDebounce';
import { useMutation, useQuery } from '@tanstack/react-query';
import { checkOnboardingStoreName, storeOnboarding } from '@/services/onboarding.services';

export const useStoreInfo = () => {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const {
    currentStep,
    setCurrentStep,
    setCompletedStep,
    data: onboardingData,
    setData,
    setCreatedSellerStoreId,
  } = useOnboarding();

  const form = useForm<TAddStoreOnboardingSchema>({
    resolver: zodResolver(addStoreOnboardingSchema),
    defaultValues: {
      ...onboardingData['Add Store Info'],
    },
  });

  const storeName = form.watch('storeName');

  const {
    isSuccess: isNameAvailable,
    isLoading: isCheckingName,
    isError: isNameError,
    error: nameError,
  } = useStoreName(storeName);

  const {
    mutate: storeOnboardingMutation,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['onboarding'],
    mutationFn: storeOnboarding,
    onSuccess: data => {
      setIsCompleted(true);
      console.log(data.data);
      setCreatedSellerStoreId(data.data?.store?.id);
    },
  });

  const onSubmit = (formData: TAddStoreOnboardingSchema) => {
    if (isNameAvailable === false) return;

    setData('Add Store Info', formData);

    storeOnboardingMutation({
      ...onboardingData['Add Personal Info'],
      ...onboardingData['Add Store Info'],
    });
  };

  const handleNext = () => {
    if (isCompleted || form.formState.isValid) {
      setIsCompleted(true);
      setCurrentStep(currentStep + 1);
      setCompletedStep('Add Store Info');
    }
  };

  React.useEffect(() => {
    if (isNameError) {
      const msg = nameError instanceof Error ? nameError?.message : 'Name not available';

      form.control.setError('storeName', {
        message: msg,
      });
    } else {
      form.clearErrors('storeName');
    }
  }, [isNameError]);

  return {
    form,
    onSubmit,
    isCompleted,
    handleNext,
    isPending,
    isNameAvailable,
    isCheckingName,
    error,
  };
};

function useStoreName(storeName: string) {
  const debouncedStoreName = useDebounce(storeName);

  return useQuery({
    queryKey: ['check-store-name', debouncedStoreName],
    queryFn: () => checkOnboardingStoreName(debouncedStoreName),
    enabled: !!debouncedStoreName,
    staleTime: 1000 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
