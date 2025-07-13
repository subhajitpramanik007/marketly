export type Role = 'owner' | 'partner' | 'manager' | 'staff';

const PERMISSIONS = [
  'manage_roles',
  'view_staff',
  'add_staff',
  'add_avatar',
  'manage_staff',
  'delete_staff',
  'view_orders',
  'manage_orders',
  'view_products',
  'manage_products',
  'delete_products',
] as const;
export type Permission = (typeof PERMISSIONS)[number];

export const STAFF_PERMISSIONS_BY_ROLE: Record<Role, Set<Permission>> = {
  owner: new Set(PERMISSIONS),
  partner: new Set(['view_staff', 'view_orders', 'view_products']),
  manager: new Set([
    'manage_staff',
    'manage_orders',
    'manage_products',
    'add_staff',
    'add_avatar',
    'view_staff',
    'view_orders',
    'view_products',
    'delete_products',
  ]),
  staff: new Set(['view_orders', 'view_products', 'manage_products']),
} as const;

// if delete_staff then target role must be required
export const hasPermission = (role: Role, permission: Permission, targetRole?: Role): boolean => {
  if (role === 'owner') return true;
  const sensitivePermissions = ['manage_staff', 'delete_staff'];

  // check for common permissions
  if (!sensitivePermissions.includes(permission)) {
    return STAFF_PERMISSIONS_BY_ROLE[role].has(permission);
  }

  // check for sensitive permissions
  if (targetRole) {
    if (role === 'manager' && targetRole === 'staff') {
      return STAFF_PERMISSIONS_BY_ROLE[role].has(permission);
    }
  }

  return false;
};
