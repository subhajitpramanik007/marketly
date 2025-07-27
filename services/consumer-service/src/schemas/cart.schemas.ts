import * as z from 'zod';

export const addToCartBodySchema = z.object({
  productId: z.number().or(z.string().transform(val => parseInt(val))),
  quantity: z.number().min(1).optional().default(1),
});

export const updateCartItemQuantityBodySchema = z.object({
  quantity: z.number().min(1),
});

export const cartItemIdParamsSchema = z.object({
  cartItemId: z.string().transform(val => parseInt(val)),
});
