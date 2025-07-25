import { ApiResponse, asyncHandler, BadRequestError } from '@marketly/http';
import * as wishlistService from '@/services/wishlist.service';

export const getWishlists = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;

  const products = await wishlistService.getWishlists(accountId);

  res.status(200).json(new ApiResponse(200, { products }));
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  const accountId = parseInt(req.consumer?.accountId);

  const productId = parseInt(req.params?.productId);
  if (!productId) throw new BadRequestError('Product id is required');

  const wishlist = await wishlistService.getWishlist(accountId, productId);

  if (wishlist) {
    await wishlistService.removeFromWishlist(wishlist.id);

    res.status(200).json(new ApiResponse(200, {}));
    return;
  }

  await wishlistService.addToWishlist(accountId, productId);

  res.status(200).json(new ApiResponse(200, {}));
});
