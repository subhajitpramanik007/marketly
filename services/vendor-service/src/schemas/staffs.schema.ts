import * as z from 'zod';

export const STAFF_PERMISSIONS = ['owner', 'manager', 'staff'] as const;

export const vendorStaffPerminissionSchema = z.object({
  permission: z.enum(STAFF_PERMISSIONS).default('staff'),
});

export const createStaffSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(32),
  phoneNumber: z.string().default('1234567890'),
  permission: z.enum(STAFF_PERMISSIONS).default('staff'),
});

export const updateStaffSchema = createStaffSchema.partial();

export type TVendorStaffPermission = z.infer<typeof vendorStaffPerminissionSchema>;
export type TCreateVendorStaff = z.infer<typeof createStaffSchema>;
export type TUpdateVendorStaff = z.infer<typeof updateStaffSchema>;
