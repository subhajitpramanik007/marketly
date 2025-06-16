"use client";

import { AuthCardWrapper, AuthPageWrapper, LoginForm } from "@/components/auth";
import { useSubDomain } from "@/store/subdomain.store";

export default function LoginPage() {
  const { userType, subdomain } = useSubDomain();

  const title = !subdomain ? "Login to Consumer" : `Login to ${userType}`;

  return (
    <AuthPageWrapper title={title}>
      <AuthCardWrapper
        cardTitle="Welcome Back"
        footerAs="link"
        footerText="Don't have an account? "
        footerLink={{ href: "/auth/register", text: "register" }}
      >
        <LoginForm />
      </AuthCardWrapper>
    </AuthPageWrapper>
  );
}
