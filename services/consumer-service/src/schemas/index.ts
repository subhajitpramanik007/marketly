import * as z from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const resendUserRegistrationOtpSchema = registerSchema;

export const verifyUserRegistrationOtpSchema = registerSchema.extend({
  otp: z.preprocess(val => (typeof val === 'string' ? parseInt(val, 10) : val), z.number()),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    otp: z.preprocess(val => (typeof val === 'string' ? parseInt(val, 10) : val), z.number()),
    password: z.string().min(6).max(32),
    confirmPassword: z.string().min(6).max(32),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ResendUserRegistrationOtpSchema = z.infer<typeof resendUserRegistrationOtpSchema>;
export type VerifyUserRegistrationOtpSchema = z.infer<typeof verifyUserRegistrationOtpSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// Export cart schemas
export * from './cart.schemas';

// Export order schemas
export * from './order.schemas';
