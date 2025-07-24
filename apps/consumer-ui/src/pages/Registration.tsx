'use client';

import * as React from 'react';
import { RegistrationProvider, useRegistration } from '@/components/auth/RegistrationProvider';
import { AuthCardWrapper } from '@/components/auth/AuthCardWrapper';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { EmailVerification } from '@/components/auth/EmailVerification';

export default function Registration() {
  return (
    <RegistrationProvider>
      <RegistrationContainer />
    </RegistrationProvider>
  );
}

const RegistrationContainer: React.FC = () => {
  const { isDoneRegistration } = useRegistration();

  return (
    <AuthCardWrapper
      headerText="Create an account"
      footerText="Already have an account?"
      footerLink={{ href: '/auth/login', text: 'Login' }}
    >
      {isDoneRegistration ? <EmailVerification /> : <RegisterForm />}
    </AuthCardWrapper>
  );
};
