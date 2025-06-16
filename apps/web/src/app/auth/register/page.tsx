"use client";

import {
  AuthCardWrapper,
  AuthPageWrapper,
  RegisterForm,
} from "@/components/auth";
import { useSubDomain } from "@/store/subdomain.store";

export default function RegisterPage() {
  const { subdomain, userType } = useSubDomain();

  const title = subdomain ? `Register to ${userType}` : "Register to Consumer";

  return (
    <AuthPageWrapper title={title}>
      <AuthCardWrapper
        cardTitle="Welcome to Marketly"
        footerAs="link"
        footerText="Already have an account? "
        footerLink={{ href: "/auth/login", text: "login" }}
      >
        <RegisterForm userType={userType} />
      </AuthCardWrapper>
    </AuthPageWrapper>
  );
}
