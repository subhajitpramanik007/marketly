'use client';

import React from 'react';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OnboardFormActions } from './OnboardFormActions';
import { useOnboarding } from './OnboardingProvider';

export const AddPaymentMethods = () => {
  const { currentStep, setCurrentStep, setCompletedStep, data, setData } = useOnboarding();
  const [paymentMethod, setPaymentMethod] = React.useState<'razorpay' | 'stripe'>(
    data['Add Payment Methods']?.paymentMethod || 'razorpay',
  );
  function onChangePaymentMethod(value: string) {
    setPaymentMethod(value as 'razorpay' | 'stripe');
    setData('Add Payment Methods', { paymentMethod: value });
  }

  return (
    <div className="space-y-6 flex flex-col w-full h-full justify-between">
      <div className="flex w-full justify-between">
        <Label htmlFor="select-payment-method">Select Payment Method</Label>
        <Select onValueChange={value => setPaymentMethod(value as any)} value={paymentMethod}>
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="razorpay">Razor Pay</SelectItem>
            <SelectItem value="stripe">Stripe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <OnboardFormActions
        key={currentStep}
        isShowSkip
        onSkip={() => {
          setCurrentStep(currentStep + 1);
          setCompletedStep('Add Payment Methods');
        }}
        onNext={() => {
          setCurrentStep(currentStep + 1);
          setCompletedStep('Add Payment Methods');
        }}
      />
    </div>
  );
};
