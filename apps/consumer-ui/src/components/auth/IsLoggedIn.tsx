import { useSession } from '@/hooks/auth/useSession';
import * as React from 'react';

interface IsLoggedInProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const IsLoggedIn: React.FC<IsLoggedInProps> = ({ children }) => {
  const { isAuthenticated } = useSession();

  if (isAuthenticated) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return null;
};
