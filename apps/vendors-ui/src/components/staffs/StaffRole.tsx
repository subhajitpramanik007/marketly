'use client';

import * as React from 'react';
import { Role } from '@/lib/permissions';
import { Badge } from '../ui/badge';
import { cva } from 'class-variance-authority';

const StaffRoleVariants = cva('capitalize', {
  variants: {
    role: {
      owner: 'bg-red-500 text-white dark:bg-red-600',
      partner: 'bg-purple-500 text-white dark:bg-purple-600',
      manager: 'bg-blue-500 text-white dark:bg-blue-600',
      staff: 'bg-gray-500 text-white dark:bg-gray-600',
    },
  },
  defaultVariants: {
    role: 'staff',
  },
});

export function StaffRole({ role }: { role: Role }) {
  return <Badge className={StaffRoleVariants({ role })}>{role}</Badge>;
}
