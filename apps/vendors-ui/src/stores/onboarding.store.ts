import { create } from 'zustand';

interface OnboardingState {
  currentStep: number;
  completedStep: number;
}

export interface OnboardingStore extends OnboardingState {
  setCurrentStep: (step: number) => void;
  setCompletedStep: (step: number) => void;
  reset: () => void;
}

const initialState: OnboardingState = {
  currentStep: 1,
  completedStep: 0,
};

export const useOnboardingStore = create<OnboardingStore>(set => ({
  ...initialState,

  setCurrentStep: (step: number) => {
    set(state => ({
      currentStep: step,
      completedStep: Math.max(state.completedStep, step - 1),
    }));
  },
  setCompletedStep: (step: number) => set({ completedStep: step }),

  reset: () => set({ ...initialState }),
}));
