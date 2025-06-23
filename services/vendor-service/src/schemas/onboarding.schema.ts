import { z } from 'zod';

export const zodString = (name: string, min: number = 1, max: number = 100) =>
  z
    .string({
      description: `${name}`,
      message: `${name} is required`,
      required_error: `${name} is required`,
      invalid_type_error: `${name} must be a string`,
    })
    .min(min, `${name} must contain at least ${min} characters`)
    .max(max, `${name} must contain at most ${max} characters`);

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

export const vendorStoreOnboardingSchema = personalInfoSchema.extend({
  storeName: zodString('Store name', 5, 50),
  description: z.string().max(200).optional(),
  category: z.string(),
});

export const vendorStoreAddressSchema = z.object({
  addressLine1: zodString('Address line 1, e.g. Street, House No.', 3, 100),
  addressLine2: z.string().optional(),
  city: zodString('City', 3, 50),
  state: zodString('State/Province', 2, 50),
  zipCode: zodString('Zip Code', 5, 10),
  country: zodString('Country', 3, 50),
});
