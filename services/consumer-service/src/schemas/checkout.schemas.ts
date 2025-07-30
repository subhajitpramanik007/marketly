import z from 'zod';

export const cartItem = z.object({
  id: z.number(),
  quantity: z.number().min(1),
  productId: z.number(),
});

export const getCheckoutProductsBodySchema = z.object({
  cartItemIds: z.array(cartItem),
});

export const checkoutPaymentVerifyBodySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export type CartItem = z.infer<typeof cartItem>;
export type GetCheckoutProductsBody = z.infer<typeof getCheckoutProductsBodySchema>;
export type CheckoutPaymentVerifyBody = z.infer<typeof checkoutPaymentVerifyBodySchema>;
