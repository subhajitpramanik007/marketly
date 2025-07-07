import { dbClient, eq } from '@marketly/drizzle';
import { vendorStoreTable } from '@marketly/drizzle/db/schemas';
import { ApiError, BadRequestError } from '@marketly/http';

export const getVendorStoreData = async (
  vendorId: number,
): Promise<typeof vendorStoreTable.$inferSelect> => {
  try {
    const vendorStore = await dbClient.query.vendorStoreTable.findFirst({
      where: eq(vendorStoreTable.id, vendorId),
    });

    if (!vendorStore) {
      throw new BadRequestError('Vendor store not found');
    }

    return vendorStore;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new BadRequestError('Failed to get vendor store');
  }
};

export const getVendorStoreDataByAccountId = async (
  accountId: number,
): Promise<typeof vendorStoreTable.$inferSelect> => {
  try {
    const vendorStore = await dbClient.query.vendorStoreTable.findFirst({
      where: eq(vendorStoreTable.createdById, accountId),
    });

    if (!vendorStore) {
      throw new BadRequestError('Vendor store not found');
    }

    return vendorStore;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new BadRequestError('Failed to get vendor store');
  }
};
