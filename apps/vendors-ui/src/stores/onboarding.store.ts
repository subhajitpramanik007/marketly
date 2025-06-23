import { ONBOARDING_STEPS, TOnboardingStep } from '@/constants/onboarding.contants';
import {
  TAddressSchema,
  TAddStoreOnboardingSchema,
  TPersonalInfoSchema,
} from '@/schemas/onboarding.schama';
import { create } from 'zustand';

type OnboardingStepTitleToDataMap = {
  'Add Personal Info': TPersonalInfoSchema;
  'Add Store Info': TAddStoreOnboardingSchema;
  'Add Address': TAddressSchema;
  'Add Payment Methods': Record<string, any> & {
    paymentMethod: 'razorpay' | 'stripe' | '';
  };
  'Add your Logo': any;
  'Add your First Products': Record<string, never>;
};

type TOnboardingStepData = OnboardingStepTitleToDataMap;

interface OnboardingState {
  currentStep: number;
  completedStep: TOnboardingStep[];
  data: TOnboardingStepData;
  createdSellerStoreId: number | string | null;
}

export interface OnboardingStore extends OnboardingState {
  setCurrentStep: (step: number) => void;
  setCompletedStep: (step: TOnboardingStep['title']) => void;
  setData: (
    type: TOnboardingStep['title'],
    data: TOnboardingStepData[TOnboardingStep['title']],
  ) => void;
  setCreatedSellerStoreId: (id: number | string | null) => void;
  reset: () => void;
}

const initialState: OnboardingState = {
  currentStep: 1,
  completedStep: [],
  createdSellerStoreId: null,
  data: {
    'Add Personal Info': {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
    'Add Store Info': {
      storeName: '',
      description: '',
      category: 'electronics',
    },
    'Add Address': {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    'Add Payment Methods': {
      paymentMethod: '',
    },
    'Add your Logo': null,
    'Add your First Products': {},
  },
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  ...initialState,

  setCurrentStep: step => set({ currentStep: step }),
  setCompletedStep: step => {
    set(state => ({
      completedStep: [...state.completedStep, ONBOARDING_STEPS.find(s => s.title === step)!],
    }));
  },

  setData: (type, data) =>
    set(state => ({
      data: {
        ...state.data,
        [type]: data,
      },
    })),

  setCreatedSellerStoreId: createdSellerStoreId => set({ createdSellerStoreId }),

  reset: () => set({ ...initialState }),
}));
