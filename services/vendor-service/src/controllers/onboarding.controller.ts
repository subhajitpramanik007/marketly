import {
  ApiResponse,
  asyncHandler,
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  zodValidation,
} from '@marketly/http';
import { dbClient, eq } from '@marketly/drizzle';
import { vendorStoreTable, vendorStaffTable, addressTable } from '@marketly/drizzle/db/schemas';
import { vendorStoreAddressSchema, vendorStoreOnboardingSchema } from '@/schemas/onboarding.schema';

// vendor store onboarding
export const vendorStoreOnboarding = asyncHandler(async (req, res) => {
  const { firstName, lastName, storeName, phoneNumber, category, email, description } =
    zodValidation(vendorStoreOnboardingSchema, req.body);

  //   check uqine store name
  const isStoreNameUnique = await dbClient.query.vendorStoreTable.findFirst({
    where: eq(vendorStoreTable.storeName, storeName),
  });

  if (isStoreNameUnique) {
    throw new ConflictError('Store name already exists');
  }

  const storeCreatedData: typeof vendorStoreTable.$inferInsert = {
    createdById: req.user?.id,
    storeName,
    storeCategory: category,
    storePhoneNumber: phoneNumber ?? '',
    storeEmail: email ?? req.user?.email,
    storeDescription: description ?? storeName,
  };

  const [vendorStore] = await dbClient
    .insert(vendorStoreTable)
    .values(storeCreatedData)
    .returning();

  if (!vendorStore) {
    throw new BadRequestError('Failed to create store');
  }

  const [storeOwner] = await dbClient
    .insert(vendorStaffTable)
    .values({
      storeId: vendorStore.id,
      firstName,
      lastName,
      email: req.user?.email,
      accountId: req.user?.id,
      role: 'owner',
      phoneNumber: phoneNumber ?? '',
    })
    .returning();

  if (!storeOwner) {
    throw new BadRequestError('Failed to create store owner');
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        store: vendorStore,
        user: storeOwner,
      },
      'Store created successfully',
    ),
  );
});

// check unique store name
export const checkStoreNameAvailability = asyncHandler(async (req, res) => {
  const storeName = req.body?.storeName;
  if (!storeName || storeName === '') {
    throw new BadRequestError('Store name is required');
  }
  if (typeof storeName !== 'string') {
    throw new BadRequestError('Store name must be a string');
  }
  const isStoreNameUnique = await dbClient.query.vendorStoreTable.findFirst({
    where: eq(vendorStoreTable.storeName, storeName),
  });

  if (isStoreNameUnique) {
    throw new ConflictError('Store name already exists');
  }

  res.status(200).json(new ApiResponse(200, {}, 'Store name is available'));
});

// Add store address
export const addressOnboarding = asyncHandler(async (req, res) => {
  const vendorId = parseInt(req.params.vendorId);
  if (!vendorId) {
    throw new BadRequestError('Vendor ID is required');
  }
  const { addressLine1, addressLine2, city, state, country, zipCode } = zodValidation(
    vendorStoreAddressSchema,
    req.body,
  );

  const addressData: typeof addressTable.$inferInsert = {
    addressLine1,
    addressLine2: addressLine2 ?? '',
    city,
    state,
    country,
    zipCode,
  };

  const [address] = await dbClient.insert(addressTable).values(addressData).returning();

  if (!address) {
    throw new BadRequestError('Failed to create address');
  }

  const [vendorStore] = await dbClient
    .update(vendorStoreTable)
    .set({ storeAddress: address.id, isOnboard: true })
    .where(eq(vendorStoreTable.id, vendorId))
    .returning();

  if (!vendorStore) {
    throw new BadRequestError('Failed to update store address');
  }

  res
    .status(200)
    .json(new ApiResponse(200, { address, store: vendorStore }, 'Address created successfully'));
});

export const vendorOnboardingStatus = asyncHandler(async (req, res) => {
  let onboardingSteps = [
    'Add Personal Info',
    'Add Store Info',
    'Add Address',
    'Add Payment Methods',
    'Add your Logo',
    'Add your First Products',
  ];
  let status: 'Completed' | 'Pending' = 'Pending';

  // get vendor onboarding status
  const accountId = req.user?.id;
  if (!accountId) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const vendor = await dbClient.query.vendorStoreTable.findFirst({
    where: eq(vendorStoreTable.createdById, accountId),
  });

  if (!vendor) {
    throw new BadRequestError('Vendor not found');
  }

  //   idOnboard - means complete upto address
  if (vendor.isOnboard) {
    onboardingSteps = onboardingSteps.slice(3);
  } else {
    onboardingSteps = onboardingSteps.slice(2);
  }

  //   idOnboard & storePaymentMethodId - means complete
  if (vendor.isOnboard && vendor.storePaymentMethodId) {
    status = 'Completed';
    onboardingSteps = [];
  }

  res
    .status(200)
    .json(new ApiResponse(200, { onboardingSteps, status }, 'Onboarding status fetched'));
});
