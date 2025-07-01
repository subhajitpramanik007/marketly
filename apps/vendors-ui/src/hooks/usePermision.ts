'use client';

import { useSession } from './useSession';

export const usePermission = () => {
  const { user } = useSession();

  return {
    isOwner: user?.role === 'owner',
    isManager: user?.role === 'manager',
    isCanManage: user?.role === 'owner' || user?.role === 'manager',
  };
};
