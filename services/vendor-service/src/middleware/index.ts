import { getVendorStaffData } from '@/services/vendor-staff.service';
import { getVendorStoreDataByAccountId } from '@/services/vendor-store.service';
import { vendorStaffTable, vendorStoreTable } from '@marketly/drizzle/db/schemas';
import { ApiError, asyncHandler, ForbiddenError } from '@marketly/http';
import { logger } from '@marketly/logger';

declare global {
  namespace Express {
    interface Request {
      vendorStore?: typeof vendorStoreTable.$inferSelect;
      vendorStaff?: Partial<typeof vendorStaffTable.$inferSelect>;
    }
  }
}

export const vendorAuthMiddleware = asyncHandler(async (req, res, next) => {
  try {
    if (req.role !== 'vendor') throw new ForbiddenError('Access denied');

    // add vendor details to request
    const vendorStore = await getVendorStoreDataByAccountId(req.user.id);
    const vendorData = await getVendorStaffData(vendorStore.id, req.user.id);

    req.vendorStore = vendorStore;
    req.vendorStaff = vendorData;

    next();
  } catch (error) {
    logger.error(error, 'Failed to authenticate vendor');
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ForbiddenError('Access denied');
  }
});

export const isVendorAdmin = asyncHandler(async (req, res, next) => {
  try {
    if (req.role !== 'vendor') throw new ForbiddenError('Access denied');

    if (req.vendorStaff?.role !== 'owner') throw new ForbiddenError('Vendor admin access only');

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ForbiddenError('Vendor admin access only');
  }
});

export const canManageVendorStore = asyncHandler(async (req, res, next) => {
  try {
    if (req.role !== 'vendor') throw new ForbiddenError('Access denied');

    if (req.vendorStaff?.role !== 'manager' && req.vendorStaff?.role !== 'owner') {
      throw new ForbiddenError('Vendor manager and owner access only');
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ForbiddenError('Vendor manager and owner access only');
  }
});
