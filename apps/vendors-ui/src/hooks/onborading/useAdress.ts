import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema, TAddressSchema } from '@/schemas/onboarding.schama';
import { useOnboarding } from '@/components/onboarding';
import { useMutation } from '@tanstack/react-query';
import { addStoreAddress } from '@/services/onboarding.services';

export const useAddress = () => {
  const [isCompleted, setIsCompleted] = React.useState(false);

  const { currentStep, setCurrentStep, setCompletedStep, data, setData, createdSellerStoreId } =
    useOnboarding();
  const form = useForm<TAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...data['Add Address'],
    },
  });

  const {
    mutate: addAddress,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['onboarding', 'address'],
    mutationFn: (data: TAddressSchema & { storeId: string }) => addStoreAddress(data.storeId, data),
    onSuccess: () => {
      setIsCompleted(true);
    },
  });

  const onSubmit = (data: TAddressSchema) => {
    console.log(data, createdSellerStoreId);
    setData('Add Address', data);
    if (!createdSellerStoreId) {
      form.setError('root', { type: 'manual', message: 'Store Id not found' });
      return;
    }

    addAddress({
      ...data,
      storeId: createdSellerStoreId.toString(),
    });
  };

  const handleNext = () => {
    if (isCompleted || form.formState.isValid) {
      setIsCompleted(true);
      setCurrentStep(currentStep + 1);
      setCompletedStep('Add Address');
    }
  };

  return {
    form,
    onSubmit,
    handleNext,
    isCompleted,
    isPending,
    error,
  };
};
