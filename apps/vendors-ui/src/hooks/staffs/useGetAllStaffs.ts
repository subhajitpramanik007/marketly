'use client';

import { getAllStaffs } from '@/services/staffs.services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/hooks/useSession';

export const useGetAllStaffs = () => {
  const { store, isAuthenticated } = useSession();

  return useQuery({
    queryKey: ['staffs'],
    queryFn: () => getAllStaffs(store!.id),
    enabled: isAuthenticated && !!store,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
