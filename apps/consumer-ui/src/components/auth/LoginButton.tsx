import * as React from 'react';
import { Button } from '@/components/ui/button';

import { Link, useRouter } from '@tanstack/react-router';

import { useSession } from '@/hooks/auth';

interface LoginButtonProps extends React.ComponentProps<typeof Button> {}

export const LoginButton: React.FC<LoginButtonProps> = props => {
  if (props.asChild) {
    return <ButtonAsChild {...props} />;
  }

  return (
    <Link to="/auth/login" className="w-full">
      <Button variant="outline" className="w-full" {...props}>
        <span>Login</span>
      </Button>
    </Link>
  );
};

const ButtonAsChild: React.FC<LoginButtonProps> = props => {
  const router = useRouter();
  const { isAuthenticated } = useSession();

  function onClick() {
    if (!isAuthenticated) {
      router.navigate({ to: '/auth/login' });
    }
  }

  return (
    <Button asChild {...props} onClick={onClick}>
      {props.children}
    </Button>
  );
};
