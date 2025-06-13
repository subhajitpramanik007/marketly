import * as z from 'zod';

export const vendorStaffSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(32),
  phoneNumber: z.string().default('1234567890'),
});

export const vendorStaffUpdateSchema = vendorStaffSchema.partial();

export const vendorStaffPerminissionSchema = z.object({
  permissions: z.enum(['Admin', 'Manager', 'Staff']),
});
