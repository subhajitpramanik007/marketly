import z from 'zod';
import { zodString } from './utils.schema';

export const vendorStoreOnboardingSchema = z.object({
  storeName: zodString('Store Name').min(2).max(50),
  firstName: zodString('First Name').min(3).max(50),
  lastName: zodString('Last Name').min(3).max(50),
  description: z.string().max(200).optional(),
  phoneNumber: z.string().default('1234567890'),
  address: z.string().optional(),
});

export type TVendorStoreOnboardingSchema = z.infer<typeof vendorStoreOnboardingSchema>;

// Add personal info schema
export const personalInfoSchema = z.object({
  firstName: zodString('First Name').min(3).max(50),
  lastName: zodString('Last Name').min(3).max(50),
  email: zodString('Email').email(),
  phoneNumber: zodString('Phone Number').min(10).max(10).optional(),
});
export type TPersonalInfoSchema = z.infer<typeof personalInfoSchema>;

// Add store onboarding schema
export const StoreCategory = z.enum([
  'electronics',
  'fashion',
  'home appliances',
  'books',
  'toys',
  'sports',
  'health and beauty',
  'automotive',
  'groceries',
  'jewelry',
  'furniture',
  'pet supplies',
  'music',
]);

export const addStoreOnboardingSchema = z.object({
  storeName: zodString('Store Name').min(2).max(50),
  description: z.string().max(200).optional(),
  category: StoreCategory,
});

export type TAddStoreOnboardingSchema = z.infer<typeof addStoreOnboardingSchema>;

// Add address schema
export const addressSchema = z.object({
  addressLine1: zodString('Address Line 1').min(3).max(100),
  addressLine2: zodString('Address Line 2').min(3).max(100).optional(),
  city: zodString('City').min(3).max(50),
  state: zodString('State').min(3).max(50),
  zipCode: zodString('Zip Code').min(6).max(10),
  country: zodString('Country').min(2).max(50),
});

export type TAddressSchema = z.infer<typeof addressSchema>;
