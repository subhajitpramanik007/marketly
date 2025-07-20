import { createFileRoute } from '@tanstack/react-router';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AuthCardWrapper } from '@/components/auth/AuthCardWrapper';

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthCardWrapper
      headerText="Create an account"
      footerText="Already have an account?"
      footerLink={{ href: '/auth/login', text: 'Login' }}
    >
      <RegisterForm />
    </AuthCardWrapper>
  );
}
