'use client';

import * as React from 'react';
import AuthLayout from '@/auth/components/AuthLayout';
import { AuthCardWrapper } from '@/auth/components/AuthCardWrapper';
import { LoginForm } from '../_components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout title="Login">
      <AuthCardWrapper
        cardTitle="Welcome Back"
        footerAs="link"
        footerText="Don't have an account?"
        footerLink={{ href: '/auth/register', text: 'register' }}
      >
        <LoginForm />
      </AuthCardWrapper>
    </AuthLayout>
  );
}
