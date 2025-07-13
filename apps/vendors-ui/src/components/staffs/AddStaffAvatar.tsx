'use client';

import { useStaffData } from '@/hooks/staffs/useStaffData';
import * as React from 'react';
import { AddAvatarDialog } from '../AddAvatarDialog';
import { useUpdateStaffAvatar } from '@/hooks/staffs/useUpdateStaffAvatar';

export const AddStaffAvatar: React.FC<{
  staffId: number;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}> = ({ staffId, openDialog, setOpenDialog }) => {
  const { staff } = useStaffData(staffId);

  const updateAvatar = useUpdateStaffAvatar(staff?.storeId!, staffId);

  return (
    <AddAvatarDialog
      title="Upload Avatar"
      description="Please select an avatar"
      oldAvatarUrl={staff?.avatar?.url || null}
      open={openDialog}
      onOpenChange={setOpenDialog}
      callback={response => updateAvatar.mutate(response.id)}
    />
  );
};
