'use client';

import * as React from 'react';
import { IVendorStaff } from '@/types';
import { StaffCard } from './StaffCard';
import { NewStaffAddCard } from './NewStaffAddCard';

export const AllStaffs: React.FC<{ staffs: IVendorStaff[] }> = ({ staffs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {staffs.map(staff => (
        <StaffCard key={staff.id} staff={staff} />
      ))}
      <NewStaffAddCard />
    </div>
  );
};
