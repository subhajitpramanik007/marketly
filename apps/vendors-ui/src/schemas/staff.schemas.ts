import * as z from 'zod';

export const staffSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(10),
  password: z.string().min(6).max(32),
});

export const staffUpdateSchema = staffSchema.partial();

export type StaffSchema = z.infer<typeof staffSchema>;
export type StaffUpdateSchema = z.infer<typeof staffUpdateSchema>;
