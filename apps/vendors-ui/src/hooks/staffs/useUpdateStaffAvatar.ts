import { updateStaffAvatar } from '@/services/staffs.services';
import { useMutation } from '@tanstack/react-query';

export const useUpdateStaffAvatar = (storeId: number, staffId: number) => {
  return useMutation({
    mutationKey: ['staff', 'avatar', 'update'],
    mutationFn: (imageId: number) => updateStaffAvatar(storeId, staffId, { imageId }),
  });
};
