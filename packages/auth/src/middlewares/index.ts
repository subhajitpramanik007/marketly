import { asyncHandler, ForbiddenError, UnauthorizedError } from '@marketly/http';
import { verifyAccessToken } from '../services';
import { RequestHandler } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: any;
      currentUser: any;
      role: 'consumer' | 'vendor';
    }
  }
}

export const authMiddleware: RequestHandler = asyncHandler(async (req, _, next) => {
  // check cookies or headers
  const accessToken = req.cookies['_accessToken'] || req.headers['authorization']?.split(' ')[1];

  if (!accessToken) throw new UnauthorizedError('Access token not found');

  // verify access token
  const payload = await verifyAccessToken(accessToken);
  if (!payload) throw new UnauthorizedError('Invalid access token');

  req.user = payload;
  req.currentUser = payload;

  req.role = payload.role;

  next();
});

const consumerAuthMiddleware = asyncHandler(async (req, res, next) => {
  if (req.role !== 'consumer') throw new ForbiddenError('Access denied');
  next();
});

const vendorAuthMiddleware = asyncHandler(async (req, res, next) => {
  if (req.role !== 'vendor') throw new ForbiddenError('Access denied');
  next();
});
