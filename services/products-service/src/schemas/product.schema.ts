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

export type NewProductSchema = z.infer<typeof newProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;