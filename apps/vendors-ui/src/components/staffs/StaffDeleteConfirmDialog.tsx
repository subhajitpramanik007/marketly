'use client';

import * as React from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useDeleteStaff } from '@/hooks/staffs/useDeleteStaff';
import { IVendorStaff } from '@/types';

export const StaffDeleteConfirmDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  onCancel: () => void;
  staff: IVendorStaff;
}> = ({ open, setOpen, onCancel, staff }) => {
  const { mutate: deleteStaff } = useDeleteStaff(staff.role);

  const onConfirm = () => {
    deleteStaff({ storeId: staff.storeId, staffId: staff.id });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Staff</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this staff? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild onClick={onCancel}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onConfirm} variant="destructive">
            Delete Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
