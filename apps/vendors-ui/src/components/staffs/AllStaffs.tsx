'use client';

import * as React from 'react';
import { IVendorStaff } from '@/types';
import { StaffCard } from './StaffCard';
import { NewStaffAddCard } from './NewStaffAddCard';
import { usePermission } from '@/hooks/usePermision';
import { DisplayThis } from '../DisplayThis';

export const AllStaffs: React.FC<{ staffs: IVendorStaff[] }> = ({ staffs }) => {
  const { isCanManage } = usePermission();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {staffs.map(staff => (
        <StaffCard key={staff.id} staff={staff} />
      ))}

      <DisplayThis when={isCanManage}>
        <NewStaffAddCard />
      </DisplayThis>
    </div>
  );
};
