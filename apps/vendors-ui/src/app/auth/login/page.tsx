'use client';

import * as React from 'react';
import AuthLayout from '@/auth/components/AuthLayout';
import { AuthCardWrapper } from '@/auth/components/AuthCardWrapper';
import { LoginForm } from '../_components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout title="Register">
      <AuthCardWrapper
        cardTitle="Welcome to Marketly"
        footerAs="link"
        footerText="Already have an account?"
        footerLink={{ href: '/auth/login', text: 'login' }}
      >
        <LoginForm />
      </AuthCardWrapper>
    </AuthLayout>
  );
}
