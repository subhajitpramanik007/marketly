import api from './axios';

import {
  TPersonalInfoSchema,
  TAddStoreOnboardingSchema,
  TAddressSchema,
} from '@/schemas/onboarding.schama';

export const checkOnboardingStoreName = (storeName: string) => {
  return api.post(`/vendors/onboarding/check-store-name`, { storeName });
};

export const storeOnboarding = (data: TPersonalInfoSchema & TAddStoreOnboardingSchema) => {
  return api.post(`/vendors/onboarding`, data);
};

export const addStoreAddress = (storeId: string, data: TAddressSchema) => {
  return api.post(`/vendors/onboarding/${storeId}/address`, data);
};
