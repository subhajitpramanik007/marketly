import { z } from 'zod';
import { vendorStaffSchema, vendorStaffPerminissionSchema } from './staffs.schema';

export type TCreateVendorStaff = z.infer<typeof vendorStaffSchema>;

export type TUpdateVendorStaff = Partial<TCreateVendorStaff>;

export type TUpdateVendorStaffPermission = z.infer<typeof vendorStaffPerminissionSchema>;
