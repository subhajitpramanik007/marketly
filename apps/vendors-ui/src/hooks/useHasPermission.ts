'use client';

import { hasPermission, Permission, Role } from '@/lib/permissions';
import React from 'react';
import { useSession } from './useSession';

export const useHasPermission = <T extends Permission>(
  permission: Permission,
  targetRole: T extends 'manage_staff' | 'delete_staff' ? Role : never,
) => {
  const { user } = useSession();

  if (!user) return false;

  const { role: userRole } = user;

  return React.useMemo(
    () => hasPermission(userRole, permission, targetRole),
    [userRole, permission, targetRole],
  );
};
