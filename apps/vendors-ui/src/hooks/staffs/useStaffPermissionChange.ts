'use client';

import toast from 'react-hot-toast';
import { useSession } from '../useSession';

import { updateStaffPermission } from '@/services/staffs.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useStaffPermissionChange = (staffId: number) => {
  const { store } = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['staff', 'permission', 'change'],
    mutationFn: (permission: 'owner' | 'manager' | 'staff') =>
      updateStaffPermission(store!.id, staffId, { permission }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', { staffId }] });
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      toast.success('Permission changed successfully');
    },
    onError: () => {
      toast.error('Failed to change permission');
    },
  });
};
