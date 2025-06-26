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
  firstName: zodString('First Name', 3, 50),
  lastName: zodString('Last Name', 3, 50),
  email: zodString('Email').email(),
  phoneNumber: z
    .string({
      message: 'Phone Number is required',
      required_error: 'Phone Number is required',
    })
    .min(10, 'Phone Number must be exactly 10 digits')
    .max(10, 'Phone Number must be exactly 10 digits'),
});
export type TPersonalInfoSchema = z.infer<typeof personalInfoSchema>;

// Add store onboarding schema
export const CATEGORIES = [
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
] as const;

export const StoreCategory = z.enum(CATEGORIES);

export const addStoreOnboardingSchema = z.object({
  storeName: zodString('Store name', 5, 50),
  description: z.string().max(200).optional(),
  category: StoreCategory,
});

export type TAddStoreOnboardingSchema = z.infer<typeof addStoreOnboardingSchema>;

// Add address schema
export const addressSchema = z.object({
  addressLine1: zodString('Address line 1, e.g. Street, House No.', 3, 100),
  addressLine2: z.string().optional(),
  city: zodString('City', 3, 50),
  state: zodString('State/Province', 2, 50),
  zipCode: zodString('Zip Code', 5, 10),
  country: zodString('Country', 3, 50),
});

export type TAddressSchema = z.infer<typeof addressSchema>;

// Add payment info schema razorpay or stripe
export const paymentMethods = z.enum(['razorpay', 'stripe']);
export const paymentInfoSchema = z
  .object({
    paymentMethod: paymentMethods,
    razorpayKeyId: zodString('Razorpay Key ID').optional(),
    stripePublishableKey: zodString('Stripe Publishable Key').optional(),
  })
  .refine(
    data =>
      data.paymentMethod === 'razorpay' ? !!data.razorpayKeyId : !!data.stripePublishableKey,
    {
      message: 'Payment method key is required',
      path: ['razorpayKeyId', 'stripePublishableKey'],
    },
  );

export type TPaymentInfoSchema = z.infer<typeof paymentInfoSchema>;
