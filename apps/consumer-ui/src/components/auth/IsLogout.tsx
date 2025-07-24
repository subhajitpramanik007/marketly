import { Link } from '@tanstack/react-router';
import * as React from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useSession } from '@/hooks/auth/useSession';

interface IsLogoutProps {
  children?: React.ReactNode;
  redirectTo?: string;
  asToast?: boolean;
}

export const IsLogout: React.FC<IsLogoutProps> = ({
  children,
  redirectTo = '/auth/login',
  asToast,
}) => {
  const { isAuthenticated } = useSession();

  if (isAuthenticated) {
    return null;
  }

  if (asToast) {
    function onClick() {
      toast(
        t => (
          <span className="flex gap-2 items-center">
            <p>You are not logged in</p>
            <Button variant="link" onClick={() => toast.dismiss(t.id)} asChild>
              <Link to="/auth/login">Click to login</Link>
            </Button>
            <button type="button" className="cursor-pointer" onClick={() => toast.dismiss(t.id)}>
              <X className="size-3" />
            </button>
          </span>
        ),
        {
          position: 'top-right',
        },
      );
    }

    return <div onClick={onClick}>{children}</div>;
  }

  return <Link to={redirectTo}>{children}</Link>;
};
