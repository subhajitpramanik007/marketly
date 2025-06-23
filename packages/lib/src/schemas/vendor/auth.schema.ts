import * as z from 'zod';
import { otpType, zodString } from '../utils.schema';

const vendorRegistrationEmailSchema = z.object({
  email: zodString('Email').email(),
});

const vendorRegistrationEmailVerificationSchema = vendorRegistrationEmailSchema.extend({
  otp: otpType(6),
  password: zodString('Password').min(6).max(32),
});

const vendorRegistrationSchema = z.object({
  firstName: zodString('First Name').min(3).max(50),
  lastName: zodString('Last Name').min(3).max(50),
  storeName: zodString('Store Name').min(2).max(50),
  description: z.string().max(200).optional(),
  phoneNumber: z.string().default('1234567890'),
  address: z.string().optional(),
});

const resendVendorRegistrationEmailSchema = vendorRegistrationSchema;

const vendorLoginSchema = z.object({
  email: zodString('Email').email(),
  password: zodString('Password').min(1, { message: 'Password is required' }),
});

const vendorForgotPasswordSchema = z.object({
  storeName: zodString('Store Name'),
  email: zodString('Email').email(),
});

const vendorResetPasswordSchema = z.object({
  email: zodString('Email').email(),
  otp: otpType(6),
  password: zodString('Password').min(6).max(32),
  confirmPassword: zodString('Confirm Password').min(6).max(32),
});

const vendorChangePasswordSchema = z.object({
  oldPassword: zodString('Old Password').min(1, { message: 'Old Password is required' }),
  newPassword: zodString('New Password').min(6).max(32),
  confirmNewPassword: zodString('Confirm New Password').min(6).max(32),
});

export {
  vendorRegistrationEmailSchema,
  vendorRegistrationSchema,
  vendorRegistrationEmailVerificationSchema,
  resendVendorRegistrationEmailSchema,
  vendorLoginSchema,
  vendorForgotPasswordSchema,
  vendorResetPasswordSchema,
  vendorChangePasswordSchema,
};
