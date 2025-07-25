import { logger } from '@marketly/logger';
import { verifyAccessToken } from '@marketly/lib/jwt';

import { asyncHandler, UnauthorizedError } from '@marketly/http';
import { getConsumerByAccountId } from '@/data/user.data';

declare global {
  namespace Express {
    interface Request {
      consumer: any
    }
  }
}

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies['_accessToken'] || req.headers['authorization']?.split(' ')[1];

    if (!accessToken) throw new UnauthorizedError('Access token not found');

    const payload = await verifyAccessToken(accessToken);

    if (!payload || !payload.id) throw new UnauthorizedError('Access token unauthorized');

    const userData = await getConsumerByAccountId(parseInt(payload.id));

    if (!userData) {
      throw new UnauthorizedError();
    }

    req.user = userData;
    req.consumer = userData;

    next();
  } catch (error) {
    logger.error(error, 'Cousumer authMiddleware');
    throw new UnauthorizedError('You are not logged in');
  }
});
