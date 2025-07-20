import { AuthCardWrapper } from '@/components/auth/AuthCardWrapper';
import { LoginForm } from '@/components/auth/LoginForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthCardWrapper
      headerText="Login to your account"
      footerText="Don't have an account?"
      footerLink={{ href: '/auth/register', text: 'Register' }}
    >
      <LoginForm />
    </AuthCardWrapper>
  );
}
