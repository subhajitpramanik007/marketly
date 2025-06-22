import api from './axios';

// import { TVendorStoreOnboarding } from "@/schemas/onboarding.schama";

export const checkOnboardingStoreName = (name: string) => {
  return api.post(`/vendors/onboarding/check-store-name`, { name });
};

// export const storeOnboarding = (data: TVendorStoreOnboarding) => {
//   return api.post(`/vendors/onboarding`, data);
// };
