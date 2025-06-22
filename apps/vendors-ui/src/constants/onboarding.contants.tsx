import { Store, User2, LocationEdit, CreditCard, ImageIcon, ShoppingBag } from 'lucide-react';
import React from 'react';

import {
  AddStoreInfo,
  AddPersonalInfo,
  AddAddress,
  AddPaymentMethods,
  AddLogo,
  AddFirstProducts,
} from '@/components/onboarding';

export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Add Personal Info',
    description: 'Provide your personal information',
    icon: <User2 className="size-6" />,
  },
  {
    id: 2,
    title: 'Add Store Info',
    description: 'Enter your store name and details',
    icon: <Store className="size-6" />,
  },
  {
    id: 3,
    title: 'Add Address',
    description: 'Add your business address',
    icon: <LocationEdit className="size-6" />,
  },
  {
    id: 4,
    title: 'Add Payment Methods',
    description: 'Set up your payment methods',
    icon: <CreditCard className="size-6" />,
  },
  {
    id: 5,
    title: 'Add your Logo',
    description: 'Upload your store logo',
    icon: <ImageIcon className="size-6" />,
  },
  {
    id: 6,
    title: 'Add your First Products',
    description: 'Start adding products to your store',
    icon: <ShoppingBag className="size-6" />,
  },
] as const;

export type TOnboardingStep = (typeof ONBOARDING_STEPS)[number];

export const OnboardingStepComponents: Record<TOnboardingStep['id'], React.ReactNode> = {
  1: <AddPersonalInfo />,
  2: <AddStoreInfo />,
  3: <AddAddress />,
  4: <AddPaymentMethods />,
  5: <AddLogo />,
  6: <AddFirstProducts />,
};
