import z from 'zod';

export const zodString = (name: string) => z.string({ required_error: `${name} is required` });

export const zodNumber = (name: string) => z.number({ required_error: `${name} is required` });

export const zodBoolean = (name: string) => z.boolean({ required_error: `${name} is required` });

export const otpType = (length: number) => z.string().length(length).regex(/^[0-9]+$/); 
