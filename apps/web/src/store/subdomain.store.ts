import { TUserType } from "@/types/user.type";
import { create } from "zustand";

type Subdomain = TUserType | null;

type SubdomainState = {
  isInit: boolean;
  subdomain: Subdomain;
  setSubdomain: (s: TUserType) => void;
  userType: TUserType;
};

export const useSubdomainStore = create<SubdomainState>((set) => ({
  isInit: false,
  userType: "Consumer",
  subdomain: null,
  setSubdomain: (subdomain) => {
    if (subdomain) {
      set({
        subdomain,
        userType: subdomain,
      });
    }
    set({ isInit: true });
  },
}));

export const useSubDomain = () => useSubdomainStore();
