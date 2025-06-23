import { asyncHandler, UnauthorizedError } from '@marketly/http';
import { ACCESS_TOKEN_NAMESPACE } from '@/constants/tokens.constants';
import { verifyAccessToken } from '@/utils/jwt.utils';
import { TUserType } from '@marketly/lib/schemas/auth';

declare global {
  namespace Express {
    interface Request {
      user: any;
      currentUser: any;
      role: TUserType;
    }
  }
}

export const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const accessToken =
      req.cookies[ACCESS_TOKEN_NAMESPACE] || req.headers['authorization']?.split(' ')[1];

    if (!accessToken) throw new UnauthorizedError();

    const payload = await verifyAccessToken(accessToken);

    if (!payload) throw new UnauthorizedError();

    req.user = payload;
    req.currentUser = payload;

    req.role = payload.role;

    next();
  } catch (error) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }
});
