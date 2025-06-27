import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../index';
import { verifyAccessToken } from '@marketly/lib/jwt';
import { TUserType } from '@marketly/lib/schemas/auth';
import { logger } from '@marketly/logger';

declare global {
  namespace Express {
    interface Request {
      user: any;
      currentUser: any;
      role: TUserType;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies['_accessToken'] || req.headers['authorization']?.split(' ')[1];

    if (!accessToken) throw new UnauthorizedError('Access token not found');

    const payload = await verifyAccessToken(accessToken);

    if (!payload) throw new UnauthorizedError('Access token unauthorized');

    req.user = payload;
    req.currentUser = payload;

    req.role = payload.role;

    logger.info(
      {
        user: payload,
        role: payload.role,
      },
      'Auth middleware success',
    );
    next();
  } catch (error) {
    logger.error(error, 'Auth middleware error');
    throw new UnauthorizedError('You are not authorized to access this resource');
  }
};
