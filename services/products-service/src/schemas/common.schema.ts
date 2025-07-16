import { z } from 'zod';

// pagination
export const paginationSchema = z.object({
  limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  sort: z.enum(['asc', 'desc']).default('asc'),
});
