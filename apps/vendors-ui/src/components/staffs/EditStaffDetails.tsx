'use client';

import * as React from 'react';
import { useStaffData } from '@/hooks/staffs/useStaffData';
import { EditStaffForm } from './EditStaffForm';

export const EditStaffDetails: React.FC<{
  staffId: number;
}> = ({ staffId }) => {
  const { staff } = useStaffData(staffId);

  if (!staff) {
    return <div>Staff not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-center">Edit Staff Details</h1>

      <div className="w-full md:w-md mx-auto">
        <EditStaffForm staff={staff} />
      </div>
    </div>
  );
};
