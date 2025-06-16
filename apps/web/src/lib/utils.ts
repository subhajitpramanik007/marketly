import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rootDomain =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

export const getSubDomain = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const firstSub = hostname.split(".")[0];
    return ["vendors", "admin"].includes(firstSub) ? firstSub : null;
  }
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
