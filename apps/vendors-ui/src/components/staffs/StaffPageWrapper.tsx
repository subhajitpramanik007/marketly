'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StaffData } from '@/components/staffs/StaffData';
import { EditStaffDetails } from './EditStaffDetails';
import { AddStaffAvatar } from './AddStaffAvatar';

export const StaffPageWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [staffId, setStaffId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [addAvatar, setAddAvatar] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const staffId = searchParams.get('staffId');
    const edit = searchParams.get('edit');
    const addAvatar = searchParams.get('add-avatar');

    if (staffId) {
      setStaffId(parseInt(staffId));
      if (edit && edit === 'true') {
        setEditMode(true);
      } else {
        setEditMode(false);
      }
      if (addAvatar && addAvatar === 'true') {
        setAddAvatar(true);
      } else {
        setAddAvatar(false);
      }
    } else {
      setStaffId(null);
    }
  }, [searchParams]);

  if (staffId && editMode) {
    return <EditStaffDetails staffId={staffId} />;
  }

  if (staffId && addAvatar) {
    return <AddStaffAvatar staffId={staffId} openDialog={addAvatar} setOpenDialog={setAddAvatar} />;
  }

  if (staffId) {
    return <StaffData staffId={staffId} />;
  }

  return <>{children}</>;
};
