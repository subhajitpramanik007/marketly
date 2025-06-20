import { z } from 'zod';

export const userTypeQuerySchema = z.object({
  userType: z.enum(['consumer', 'vendor', 'admin'], {
    required_error: 'User type is required in query',
  }),
});

export type UserTypeQuery = z.infer<typeof userTypeQuerySchema>;
