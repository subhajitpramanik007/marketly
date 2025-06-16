"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

import { useSubdomainStore } from "@/store/subdomain.store";
import { TUserType } from "@/types/user.type";

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useTransitionRouter();

  useEffect(() => {
    function setSubdomain() {
      const subdomain = localStorage.getItem("useAs");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (subdomain) {
        if (isLoggedIn && subdomain === "vendors") {
          const url = `http://${subdomain}.localhost:3000/${pathname}`;
          router.push(url);
        } else {
          localStorage.removeItem("useAs");
        }
      }
    }

    function initSubDomain() {
      const hostname = window.location.hostname;
      const firstSub = hostname.split(".")[0];

      const subdomain: TUserType =
        firstSub === "vendors" ? "Vendor" : "Consumer";

      if (!subdomain) return;
      useSubdomainStore.getState().setSubdomain(subdomain);
    }

    setSubdomain();
    initSubDomain();
  }, [pathname, router]);

  return <React.Fragment>{children}</React.Fragment>;
}
