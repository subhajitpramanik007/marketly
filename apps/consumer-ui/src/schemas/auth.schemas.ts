import * as z from 'zod';

const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

const registerResendOtpSchema = z.object({
  email: z.string().email(),
});

const userVerifySchema = z.object({
  email: z.string().email(),
  otp: z.preprocess(val => (typeof val === 'string' ? parseInt(val, 10) : val), z.number()),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type TRegisterSchema = z.infer<typeof registerSchema>;
type TLoginSchema = z.infer<typeof loginSchema>;
type TUserVerifySchema = z.infer<typeof userVerifySchema>;
type TRegisterResendOtpSchema = z.infer<typeof registerResendOtpSchema>;

export { registerSchema, loginSchema, registerResendOtpSchema, userVerifySchema };
export type { TRegisterSchema, TLoginSchema, TUserVerifySchema, TRegisterResendOtpSchema };
