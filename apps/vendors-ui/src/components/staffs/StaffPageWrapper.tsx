'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StaffData } from '@/components/staffs/StaffData';
import { EditStaffDetails } from './EditStaffDetails';

export const StaffPageWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [staffId, setStaffId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const staffId = searchParams.get('staffId');
    const edit = searchParams.get('edit');

    if (staffId) {
      setStaffId(parseInt(staffId));
      if (edit && edit === 'true') {
        setEditMode(true);
      } else {
        setEditMode(false);
      }
    } else {
      setStaffId(null);
    }
  }, [searchParams]);

  if (staffId && editMode) {
    return <EditStaffDetails staffId={staffId} />;
  }
  
  if (staffId) {
    return <StaffData staffId={staffId} />;
  }


  return <>{children}</>;
};
