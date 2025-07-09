'use client';

import * as React from 'react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { useStaffData } from '@/hooks/staffs/useStaffData';

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
      <h1 className="text-2xl font-bold mb-8 text-center">Staff Data</h1>

      {/* data */}
      <div className="flex flex-col gap-2 w-full sm:w-md rounded-md mx-auto m-4 p-2 bg-muted/20">
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
          <Badge variant="default">{staff.role}</Badge>
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
