'use client';

import * as React from 'react';
import AuthLayout from '@/auth/components/AuthLayout';
import { AuthCardWrapper } from '@/auth/components/AuthCardWrapper';
import { EmailRegistrationForm } from '@/app/auth/_components/EmailRegistrationForm';
import { VerifyEmailRegistrationForm } from '@/app/auth/_components/VerifyEmailRegistrationForm';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { register, registerVerify } from '@/services/auth.services';

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [step, setStep] = React.useState<'submitEmail' | 'verifyEmail'>('submitEmail');

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    onSuccess: (_, { email }) => {
      setEmail(email);
      setStep('verifyEmail');
    },
    onError: () => {
      setStep('submitEmail');
    },
  });

  const registerVerifyMutation = useMutation({
    mutationKey: ['register', 'verify'],
    mutationFn: registerVerify,
    onSuccess: () => {
      router.push('/onboarding');
    },
  });

  return (
    <AuthLayout title="Register">
      {step === 'submitEmail' ? (
        <AuthCardWrapper
          cardTitle="Welcome to Marketly"
          footerAs="link"
          footerText="Already have an account?"
          footerLink={{ href: '/auth/login', text: 'login' }}
        >
          <EmailRegistrationForm
            onSubmit={registerMutation.mutate}
            isLoading={registerMutation.isPending}
            error={registerMutation.error?.message}
          />
        </AuthCardWrapper>
      ) : (
        <AuthCardWrapper cardTitle="Welcome to Marketly" footerAs="component" cardFooter={<></>}>
          <VerifyEmailRegistrationForm
            email={email}
            onSubmit={registerVerifyMutation.mutate}
            isLoading={registerVerifyMutation.isPending}
            error={registerVerifyMutation.error?.message}
          />
        </AuthCardWrapper>
      )}
    </AuthLayout>
  );
}
