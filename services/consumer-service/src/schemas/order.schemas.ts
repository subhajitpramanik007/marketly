import * as z from 'zod';

export const createOrderBodySchema = z.object({
  cartItemIds: z.array(z.number().or(z.string().transform(val => parseInt(val)))),
  paymentMethod: z.string().min(1),
  paymentProvider: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().optional().default('INR'),
});

export const orderIdParamsSchema = z.object({
  orderId: z.string().transform(val => parseInt(val)),
});

export const updateOrderStatusBodySchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
});

export const orderQuerySchema = z.object({
  status: z.string().optional(),
  page: z
    .string()
    .transform(val => parseInt(val))
    .optional()
    .default('1'),
  limit: z
    .string()
    .transform(val => parseInt(val))
    .optional()
    .default('10'),
});

export type CreateOrderBody = z.infer<typeof createOrderBodySchema>;
export type UpdateOrderStatusBody = z.infer<typeof updateOrderStatusBodySchema>;
export type OrderQuery = z.infer<typeof orderQuerySchema>;

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
