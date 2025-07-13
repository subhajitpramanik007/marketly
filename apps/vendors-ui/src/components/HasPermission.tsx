'use client';
import { useHasPermission } from '@/hooks/useHasPermission';
import { Permission, Role } from '@/lib/permissions';
import * as React from 'react';

type StaffPermission = 'manage_staff' | 'delete_staff';
type GeneralPermission = Exclude<Permission, StaffPermission>;

type HasPermissionProps =
  | {
      permission: StaffPermission;
      targetRole: Role;
      children: React.ReactNode;
    }
  | {
      permission: GeneralPermission;
      targetRole?: never;
      children: React.ReactNode;
    };

export const HasPermission: React.FC<HasPermissionProps> = ({
  permission,
  targetRole,
  children,
}) => {
  const hasPermission = useHasPermission(permission, targetRole as Role);

  return hasPermission ? <>{children}</> : null;
};
