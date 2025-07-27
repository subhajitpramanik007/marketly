import {
  ApiResponse,
  asyncHandler,
  BadRequestError,
  UnauthorizedError,
  zodValidation,
} from '@marketly/http';
import * as cartService from '@/services/cart.service';
import {
  addToCartBodySchema,
  updateCartItemQuantityBodySchema,
  cartItemIdParamsSchema,
} from '@/schemas/cart.schemas';

export const getCartItems = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;

  const cartItems = await cartService.getCartItems(accountId);

  res.status(200).json(new ApiResponse(200, { cartItems }));
});

export const addToCart = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;
  const { productId, quantity } = zodValidation(addToCartBodySchema, req.body);

  const existingCartItem = await cartService.getCartItem(accountId, productId);

  if (existingCartItem) {
    // Update quantity if item already exists
    const updatedItem = await cartService.updateCartItemQuantity(
      existingCartItem.id,
      existingCartItem.quantity + quantity,
    );
    res
      .status(200)
      .json(new ApiResponse(200, { cartItem: updatedItem }, 'Cart item quantity updated'));
    return;
  }

  // add new
  const cartItem = await cartService.addToCart(accountId, productId, quantity);

  res.status(201).json(new ApiResponse(201, { cartItem }, 'Product added to cart'));
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;
  const { cartItemId } = zodValidation(cartItemIdParamsSchema, req.params);
  const { quantity } = zodValidation(updateCartItemQuantityBodySchema, req.body);

  const cartItem = await cartService.getCartItemById(cartItemId);
  if (!cartItem) throw new BadRequestError('Card item not found');
  if (cartItem.accountId !== accountId) throw new UnauthorizedError();

  const updatedItem = await cartService.updateCartItemQuantity(cartItemId, quantity);

  res
    .status(200)
    .json(new ApiResponse(200, { cartItem: updatedItem }, 'Cart item quantity updated'));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;
  const { cartItemId } = zodValidation(cartItemIdParamsSchema, req.params);

  const cartItem = await cartService.getCartItemById(cartItemId);
  if (!cartItem) throw new BadRequestError('Card item not found');
  if (cartItem.accountId !== accountId) throw new UnauthorizedError();

  await cartService.removeFromCart(cartItemId);

  res.status(200).json(new ApiResponse(200, {}, 'Product removed from cart'));
});

export const clearCart = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;

  await cartService.clearCart(accountId);

  res.status(200).json(new ApiResponse(200, {}, 'Cart cleared successfully'));
});

export const getCartItemCount = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;

  const count = await cartService.getCartItemCount(accountId);

  res.status(200).json(new ApiResponse(200, { count }));
});
