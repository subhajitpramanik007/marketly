import * as z from 'zod';
import { paginationSchema } from './common.schema';

const productQueryCommonSchema = paginationSchema.extend({
  min: z.string().regex(/^\d+$/).optional(),
  max: z.string().regex(/^\d+$/).optional(),
  isAvailable: z.boolean().optional().default(true),
});

// get products query schema
const productsQuerySchema = productQueryCommonSchema;

// get products by category query schema
const productsByCategoryQuerySchema = productQueryCommonSchema;

// get products by category params schema
const productsByCategoryParamsSchema = z.object({
  category: z.string().trim().min(3).max(50),
});

// get products by tag query schema
const productsByTagQuerySchema = productQueryCommonSchema;

// get products by tag body schema
const productsByTagBodySchema = z.object({
  tags: z.string().transform(val =>
    val
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean),
  ),
});

// get products by search query schema
const productsBySearchQuerySchema = productQueryCommonSchema.extend({
  search: z.string().optional(),
  category: z.string().optional(),
  tags: z
    .string()
    .transform(val =>
      val
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
    )
    .optional(),
});

// get product details query schema
const productParamsSchema = z.object({
  slug: z.string().trim().min(3).max(50),
});

type TProductsQuerySchema = z.infer<typeof productsQuerySchema>;
type TProductsByCategoryQuerySchema = z.infer<typeof productsByCategoryQuerySchema>;
type TProductsByCategoryParamsSchema = z.infer<typeof productsByCategoryParamsSchema>;
type TProductsByTagQuerySchema = z.infer<typeof productsByTagQuerySchema>;
type TProductsByTagBodySchema = z.infer<typeof productsByTagBodySchema>;
type TProductsBySearchQuerySchema = z.infer<typeof productsBySearchQuerySchema>;
type TProductDetailsQuerySchema = z.infer<typeof productParamsSchema>;

export {
  productsQuerySchema,
  productsByCategoryQuerySchema,
  productsByCategoryParamsSchema,
  productsByTagQuerySchema,
  productsByTagBodySchema,
  productsBySearchQuerySchema,
  productParamsSchema,
  TProductsQuerySchema,
  TProductsByCategoryQuerySchema,
  TProductsByCategoryParamsSchema,
  TProductsByTagQuerySchema,
  TProductsByTagBodySchema,
  TProductsBySearchQuerySchema,
  TProductDetailsQuerySchema,
};
