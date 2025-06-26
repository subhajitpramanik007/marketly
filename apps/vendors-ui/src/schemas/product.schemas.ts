import * as z from 'zod';
import { CATEGORIES } from './onboarding.schama';

export const price = z
  .number()
  .min(1)
  .refine(val => Number.isFinite(val) && /^\d+(\.\d+)?$/.test(val.toFixed(2)), {
    message: 'Price must be a number with up to two decimal places',
  });

export const PRODUCT_CATEGORYES = CATEGORIES;

const productSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required' })
    .min(5, 'Product name must be at least 5 characters')
    .max(100, 'Product name must be at most 100 characters'),
  slug: z
    .string()
    .min(5, 'Slug must be at least 5 characters')
    .max(100, 'Slug must be at most 100 characters'),
  description: z.string().max(1000).optional(),
  price: z.string(),
  stock: z.string(),
  category: z.enum(PRODUCT_CATEGORYES, { required_error: 'Category is required' }),
  tags: z.array(z.string()).optional(),
  isAvailable: z.boolean(),
});

export const newProductSchema = productSchema
  .refine(
    data => {
      const priceValue = parseFloat(data.price);
      return !isNaN(priceValue) && priceValue > 0;
    },
    {
      message: 'Price must be a positive number',
      path: ['price'],
    },
  )
  .refine(
    data => {
      const stockValue = parseInt(data.stock, 10);
      return !isNaN(stockValue) && stockValue >= 0;
    },
    {
      message: 'Stock must be a non-negative integer',
      path: ['stock'],
    },
  );

export type NewProductSchema = z.infer<typeof newProductSchema>;

export const updateProductSchema = productSchema.partial();

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
