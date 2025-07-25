import { vendorStaffTable } from '@marketly/drizzle/db/schemas';
import { dbClient, eq } from '@marketly/drizzle/index';
import { asyncHandler, ForbiddenError, UnauthorizedError } from '@marketly/http';
import { logger } from '@marketly/logger';
import { verifyAccessToken } from '@marketly/lib/jwt';

declare global {
  namespace Express {
    interface Request {
      vendor?: typeof vendorStaffTable.$inferSelect;
    }
  }
}

export const authenticatedVendor = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies['_accessToken'] || req.headers['authorization']?.split(' ')[1];

    if (!accessToken) throw new UnauthorizedError('Access token not found');

    const payload = await verifyAccessToken(accessToken);

    if (!payload || !payload.id || !payload.role) {
      throw new UnauthorizedError('Access token unauthorized');
    }

    if (payload.role !== 'vendor' || !payload?.id) {
      throw new ForbiddenError('You are not vendor');
    }

    const vendor = await dbClient.query.vendorStaffTable.findFirst({
      where: eq(vendorStaffTable.accountId, parseInt(payload?.id)),
      with: {
        store: true,
      },
    });

    if (!vendor) {
      throw new ForbiddenError('Vendor not found, please contact support');
    }

    if (!vendor.store.isOnboard) {
      throw new ForbiddenError('Complete your store onboarding first');
    }

    if (!vendor.store.isApproved) {
      throw new ForbiddenError('Your store is under review. Please wait or contact support.');
    }

    req.vendor = vendor;

    next();
  } catch (error) {
    logger.error(error, 'Authenticated vendor middleware error');
    throw new ForbiddenError('You are not authorized to access this resource');
  }
});

export const optionalAuthOfConsumer = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies['_accessToken'] || req.headers['authorization']?.split(' ')[1];

    if (accessToken) {
      const payload = await verifyAccessToken(accessToken);

      if (payload) {
        req.user = payload;
      }
    }

    next();
  } catch {
    next();
  }
});
