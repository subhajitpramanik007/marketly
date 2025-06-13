import z from 'zod';
import { zodString } from '../utils.schema';

export const vendorParamsSchema = z.object({
    vendorId: zodString('Vendor Id'),
});

export const staffOfVendorParamsSchema = z.object({
    staffId: zodString('Staff Id'),
})

export const vendorAndStaffParamsSchema = vendorParamsSchema.merge(staffOfVendorParamsSchema);

export type TVendorParams = z.infer<typeof vendorParamsSchema>;
export type TVendorStaffParams = z.infer<typeof staffOfVendorParamsSchema>;
export type TVendorAndStaffParams = z.infer<typeof vendorAndStaffParamsSchema>;