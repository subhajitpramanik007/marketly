import z from 'zod';

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

export const zodNumber = (name: string) => z.number({ required_error: `${name} is required` });

export const zodBoolean = (name: string) => z.boolean({ required_error: `${name} is required` });

export const otpType = (length: number) =>
  z
    .string()
    .length(length)
    .regex(/^[0-9]+$/);
