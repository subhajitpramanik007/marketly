import { create } from 'zustand';

interface AppInitChecksState {
  isInit: boolean;
  isOnboardedCheck: boolean;
}

interface AppInitChecksActions {
  setIsInit: (isInit: boolean) => void;
  setIsOnboardedCheck: (isOnboardedCheck: boolean) => void;

  reset: () => void;
}

const initialState: AppInitChecksState = {
  isInit: false,
  isOnboardedCheck: false,
};

export const useAppInitChecks = create<AppInitChecksState & AppInitChecksActions>(set => ({
  ...initialState,

  setIsInit: (isInit: boolean) => set({ isInit }),
  setIsOnboardedCheck: (isOnboardedCheck: boolean) => set({ isOnboardedCheck }),

  reset: () => set(initialState),
}));
