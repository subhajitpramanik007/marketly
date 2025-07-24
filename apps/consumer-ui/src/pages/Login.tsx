import { AuthCardWrapper } from '@/components/auth/AuthCardWrapper';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <AuthCardWrapper
      headerText="Login"
      footerText="Don't have an account?"
      footerLink={{ href: '/auth/register', text: 'Register' }}
    >
      <LoginForm />
    </AuthCardWrapper>
  );
}
