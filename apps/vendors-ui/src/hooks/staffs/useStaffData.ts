'use client';

import { getStaff } from '@/services/staffs.services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '../useSession';

export const useStaffData = (staffId: number) => {
  const { store, isAuthenticated } = useSession();

  const staffData = useQuery({
    queryKey: ['staff', { staffId }],
    queryFn: () => getStaff(store!.id, staffId),
    enabled: isAuthenticated && !!store,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...staffData,
    staff: staffData.data?.data.staff,
  };
};
