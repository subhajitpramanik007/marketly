'use client';

import { useSession } from './useSession';

export const usePermission = () => {
  const { user, store } = useSession();

  return {
    isOwner: user?.role === 'owner' && store?.createdById === user?.id,
    isPartner: user?.role === 'owner' && store?.createdById !== user?.id,
    isManager: user?.role === 'manager',
    isCanManage: user?.role === 'owner' || user?.role === 'manager',
    isMe: (id: number) => user?.id === id,
  };
};
