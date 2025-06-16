"use client";

import { Link, useTransitionRouter } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import { HeaderLayout } from "./headerLayout";
import { TUserType } from "@/types/user.type";

export const RootHeader = () => {
  const router = useTransitionRouter();

  function onClick(goTo: "login" | "register", userType: TUserType) {
    localStorage.setItem("useAs", userType);

    if (userType === "Consumer") {
      router.push(`http://localhost:3000/auth/${goTo}`);
    } else {
      router.push(`http://vendors.localhost:3000/auth/${goTo}`);
    }
  }

  return (
    <HeaderLayout>
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Store className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Marketly</span>
          </div>
        </div>
        <nav className="hidden items-center space-x-8 md:flex">
          <div
            className="hover:text-primary cursor-pointer text-sm font-medium transition-colors"
            onClick={() => onClick("login", "Vendor")}
          >
            For Vendors
          </div>
          <Link
            href="#about"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => onClick("login", "Consumer")}
          >
            Sign In
          </Button>
          <Button onClick={() => onClick("register", "Consumer")}>
            Get Started
          </Button>
        </div>
      </div>
    </HeaderLayout>
  );
};
