import toast from 'react-hot-toast';
import { useSession } from './useSession';
import { logoutService } from '@/services/auth.service';

import { useRouter } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useSession();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutService,
    onSuccess: () => {
      toast.success('Logged out successfully');
      queryClient.clear();

      logout();
      router.navigate({ to: '/', reloadDocument: true });
    },
    onError: () => {
      toast.error('Logout failed');
    },
  });

  return {
    logout: () => mutate(),
    isPending,
  };
};
