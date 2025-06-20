import { asyncHandler, ForbiddenError } from '@marketly/http';

export const vendorAuthMiddleware = asyncHandler(async (req, res, next) => {
  if (req.role !== 'vendor') throw new ForbiddenError('Access denied');
  next();
});
