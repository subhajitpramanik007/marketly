'use client';

import * as React from 'react';
import Link from 'next/link';

import { useStaffData } from '@/hooks/staffs/useStaffData';
import { StaffRole } from './StaffRole';
import { Button } from '../ui/button';
import { BackButtonInStaff } from './BackButton';
import { HasPermission } from '../HasPermission';

export const StaffData: React.FC<{ staffId: number }> = ({ staffId }) => {
  const { staff, isPending, isError, error } = useStaffData(staffId);

  if (isPending) {
    return <div>Fetching staff data...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!staff) {
    return <div>Staff not found</div>;
  }

  return (
    <div>
      {/* heading */}
      <div className="relative">
        <BackButtonInStaff text="Back to Staffs" link="/staffs" />
        <h1 className="text-2xl font-bold mb-8 text-center">Staff Data</h1>
      </div>

      {/* data */}
      <div className="flex flex-col gap-2 w-full sm:w-md rounded-md mx-auto m-4 p-2">
        <div className="flex flex-col gap-2 w-full bg-muted/20 p-3 rounded-md ring-1 ring-muted shadow-md">
          {/* Id */}
          <StaffDataRow keyName="id">{staff?.id}</StaffDataRow>

          {/* Name */}
          <StaffDataRow keyName="name">{staff?.firstName + ' ' + staff?.lastName}</StaffDataRow>

          {/* Email */}
          <StaffDataRow keyName="email">{staff?.email}</StaffDataRow>

          {/* Phone */}
          <StaffDataRow keyName="phone">{staff?.phoneNumber}</StaffDataRow>

          {/* Role */}
          <StaffDataRow keyName="role">
            <StaffRole role={staff.role} />
          </StaffDataRow>

          {/* Added By */}
          {staff.addedByStaff && (
            <StaffDataRow keyName="added by">
              <Link href={`/staffs?staffId=${staff.addedByStaff.id}`} className="hover:underline">
                {staff?.addedByStaff.firstName + ' ' + staff?.addedByStaff.lastName}
              </Link>
            </StaffDataRow>
          )}

          {/* Removed By */}
          {staff.removedByStaff && (
            <StaffDataRow keyName="removed by">
              <Link href={`/staffs?staffId=${staff.removedByStaff.id}`} className="hover:underline">
                {staff?.removedByStaff.firstName + ' ' + staff?.removedByStaff.lastName}
              </Link>
            </StaffDataRow>
          )}

          {/* Created At and Updated At */}
          <StaffDataRow keyName="created at">
            <span>{staff.createdAt!.toLocaleString()}</span>
          </StaffDataRow>
        </div>
        <div className="flex justify-end gap-4">
          <HasPermission permission="manage_staff" targetRole={staff.role}>
            <Button asChild>
              <Link href={`/staffs?staffId=${staff.id}&edit=true`}>Edit Staff Details</Link>
            </Button>
          </HasPermission>

          <HasPermission permission="add_avatar">
            <Button asChild>
              <Link href={`/staffs?staffId=${staff.id}&add-avatar=true`}>
                {staff.avatar ? 'Change Avatar' : 'Add Avatar'}
              </Link>
            </Button>
          </HasPermission>
        </div>
      </div>
    </div>
  );
};

const StaffDataRow: React.FC<{
  keyName: string;
  children: React.ReactNode;
}> = ({ keyName, children }) => {
  return (
    <div className="flex justify-between even:bg-muted py-1 px-3 rounded-md">
      <h2 className="font-semibold capitalize">{keyName}:</h2>
      <div>{children}</div>
    </div>
  );
};
