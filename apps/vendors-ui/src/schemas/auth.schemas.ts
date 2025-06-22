import * as z from 'zod';
import { otpType, zodString } from './utils.schema';

export const vendorRegistrationEmailSchema = z.object({
  email: zodString('Email').email(),
});

export const vendorRegistrationEmailVerificationSchema = vendorRegistrationEmailSchema.extend({
  otp: otpType(6),
  password: zodString('Password').min(6).max(32),
});

export const vendorLoginSchema = z.object({
  email: zodString('Email').email(),
  password: zodString('Password').min(1, { message: 'Password is required' }),
});

export const vendorForgotPasswordSchema = z.object({
  storeName: zodString('Store Name'),
  email: zodString('Email').email(),
});

export const vendorResetPasswordSchema = z.object({
  email: zodString('Email').email(),
  otp: otpType(6),
  password: zodString('Password').min(6).max(32),
  confirmPassword: zodString('Confirm Password').min(6).max(32),
});

export const vendorChangePasswordSchema = z.object({
  oldPassword: zodString('Old Password').min(1, { message: 'Old Password is required' }),
  newPassword: zodString('New Password').min(6).max(32),
  confirmNewPassword: zodString('Confirm New Password').min(6).max(32),
});

export type TVendorRegistrationEmail = z.infer<typeof vendorRegistrationEmailSchema>;
export type TVendorRegistrationEmailVerification = z.infer<
  typeof vendorRegistrationEmailVerificationSchema
>;
export type TVendorLogin = z.infer<typeof vendorLoginSchema>;
export type TVendorForgotPassword = z.infer<typeof vendorForgotPasswordSchema>;
export type TVendorResetPassword = z.infer<typeof vendorResetPasswordSchema>;
export type TVendorChangePassword = z.infer<typeof vendorChangePasswordSchema>;
