import * as z from 'zod';

const productSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().max(1000).optional(),
  price: z.string({}),
  stock: z.number({ coerce: true }),
  category: z.string(),
  tags: z.array(z.string()),
  isAvailable: z.boolean(),
});

export const newProductSchema = productSchema;
export const updateProductSchema = productSchema.partial();

// pagination
export const paginationSchema = z.object({
  limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  sort: z.enum(['asc', 'desc']).default('asc'),
});
