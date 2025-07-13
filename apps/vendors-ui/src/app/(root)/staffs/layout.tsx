import React from 'react';
import { Metadata } from 'next';
import { StaffPageWrapper } from '@/components/staffs/StaffPageWrapper';

export const metadata: Metadata = {
  title: 'Staffs',
  description: 'Manage your staffs',
};

export default function StaffsLayout({ children }: { children: React.ReactNode }) {
  return (
    <StaffPageWrapper>
      <div className="relative w-full">{children}</div>
    </StaffPageWrapper>
  );
}
