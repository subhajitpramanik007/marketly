import { deleteStaff } from '@/services/staffs.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useHasPermission } from '../useHasPermission';
import { Role } from '@/lib/permissions';
import toast from 'react-hot-toast';

export const useDeleteStaff = (role: Role) => {
  const hasPermission = useHasPermission('delete_staff', role);
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['staff', 'delete'],
    mutationFn: ({ storeId, staffId }: { storeId: number; staffId: number }) => {
      if (hasPermission) {
        return deleteStaff(storeId, staffId);
      } else {
        throw new Error('You do not have permission to delete this staff');
      }
    },
    onSuccess: () => {
      toast.success('Staff deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
    onError: error => {
      toast.error(error?.message || 'Failed to delete staff');
    },
  });
};
