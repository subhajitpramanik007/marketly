import * as z from 'zod';

export const vendorStoreParamsSchema = z.object({
  storeId: z
    .string({ coerce: true, required_error: 'Store Id is required' })
    .min(1, { message: 'Store Id is required' })
    .transform(Number),
});

export const vendorStaffParamsSchema = z.object({
  staffId: z
    .string({ coerce: true, required_error: 'Staff Id is required' })
    .min(1, { message: 'Staff Id is required' })
    .transform(Number),
});

export const vendorAndStaffParamsSchema = vendorStoreParamsSchema.merge(vendorStaffParamsSchema);

export type VendorStoreParams = z.infer<typeof vendorStoreParamsSchema>;
export type VendorStaffParams = z.infer<typeof vendorStaffParamsSchema>;
export type VendorAndStaffParams = z.infer<typeof vendorAndStaffParamsSchema>;
