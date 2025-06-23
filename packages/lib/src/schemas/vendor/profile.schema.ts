import z from 'zod';
import { zodString } from '../utils.schema';

export const vendorStoreUpdateSchema = z.object({
  storeName: z.string().optional(),
});

export const vendorStoreOnboardingSchema = z.object({
  storeName: zodString('Store Name').min(2).max(50),
  firstName: zodString('First Name').min(3).max(50),
  lastName: zodString('Last Name').min(3).max(50),
  description: z.string().max(200).optional(),
  phoneNumber: z.string().default('1234567890'),
  address: z.string().optional(),
});

export type TVendorStoreUpdate = z.infer<typeof vendorStoreUpdateSchema>;
export type TVendorStoreOnboarding = z.infer<typeof vendorStoreOnboardingSchema>;
