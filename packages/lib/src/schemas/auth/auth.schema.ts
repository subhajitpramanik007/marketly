import * as z from 'zod';
import { otpType, zodNumber, zodString } from '../utils.schema';

export const EUserTypeEnum = z.enum(['consumer', 'vendor', 'admin']);

export const userTypeEnumSchema = z.object({
  userType: EUserTypeEnum.default('consumer'),
});

export const consumerRegistrationSchema = z.object({
  email: zodString('Email').email(),
  password: zodString('Password').min(6).max(32),
  firstName: zodString('First Name').min(3).max(50),
  lastName: zodString('Last Name').optional(),
  otp: z.string().optional(),
});

export const resendEmailSchema = z.object({
  email: zodString('Email').email(),
});

export const consumerRegistrationEmailVerificationSchema = z.object({
  email: zodString('Email').email(),
  otp: otpType(6),
});

export const vendorRegistrationSchema = consumerRegistrationSchema.extend({
  lastName: zodString('Last Name').min(3).max(50),
  storeName: zodString('Store Name').min(2).max(50),
  phoneNumber: zodString('Phone Number').min(10).max(10).optional(),
});

export const vendorRegistrationEmailVerificationSchema = vendorRegistrationSchema.extend({
  otp: otpType(6),
});

export const userLoginSchema = z.object({
  email: zodString('Email').email(),
  password: zodString('Password').min(1, { message: 'Password is required' }),
});

export const userForgotPasswordSchema = z.object({
  email: zodString('Email').email(),
});

export const userResetPasswordSchema = z
  .object({
    email: zodString('Email').email(),
    otp: zodNumber('OTP').min(6).max(6),
    password: zodString('Password').min(6).max(32),
    confirmPassword: zodString('Confirm Password').min(6).max(32),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password and Confirm Password must be same',
    path: ['confirmPassword'],
  });
