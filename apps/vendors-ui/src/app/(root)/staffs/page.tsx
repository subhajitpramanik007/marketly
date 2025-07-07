'use client';

import React from 'react';
import { AllStaffs } from '@/components/staffs/AllStaffs';
import { useGetAllStaffs } from '@/hooks/staffs/useGetAllStaffs';

function AllStaffsPage() {
  const { data } = useGetAllStaffs();

  return (
    <div>
      <h1 className="text-2xl font-bold py-4">All Staffs</h1>

      <AllStaffs staffs={data?.data.staffs || []} />
    </div>
  );
}

export default AllStaffsPage;
