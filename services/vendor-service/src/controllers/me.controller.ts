import { dbClient, eq } from '@marketly/drizzle';
import { vendorStaffTable } from '@marketly/drizzle/db/schemas';
import { ApiResponse, asyncHandler, BadRequestError, UnauthorizedError } from '@marketly/http';

// get current vendor data - user data and store data
export const getCurrentVendorData = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const vendorData = await dbClient.query.vendorStaffTable.findFirst({
    where: eq(vendorStaffTable.accountId, userId),
    columns: {
      phoneNumber: false,
      updatedAt: false,
      avatarId: false,
      addedBy: false,
      removedBy: false,
    },
    with: {
      avatar: true,
      store: {
        columns: {
          isApproved: false,
          isVerified: false,
          isOnboard: false,
          storeAddress: false,
          storeCoverId: false,
          storePhoneNumber: false,
          updatedAt: false,
          storeLogoId: false,
          createdById: false,
        },
        with: {
          storeLogo: true,
        },
      },
    },
  });

  if (!vendorData) {
    throw new BadRequestError('Vendor not found');
  }

  const { store, ...vendor } = vendorData;

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: vendor,
        store,
      },
      'Vendor data fetched successfully',
    ),
  );
});
