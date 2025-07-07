import { TCreateVendorStaff, TUpdateVendorStaff } from '@/schemas/staffs.schema';
import { and, asc, dbClient, eq } from '@marketly/drizzle';
import { accountTable, vendorStaffTable } from '@marketly/drizzle/db/schemas';
import { BadRequestError } from '@marketly/http';
import argon from 'argon2';

const getAllVendorStaffs = async (storeId: number) => {
  return await dbClient.query.vendorStaffTable.findMany({
    where: eq(vendorStaffTable.storeId, storeId),
    orderBy: [asc(vendorStaffTable.createdAt)],
    with: {
      avatar: {
        columns: {
          id: true,
          url: true,
          alt: true,
          publicId: true,
        },
      },
      addedByStaff: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      removedByStaff: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

const getVendorStaffData = async (storeId: number, staffId: number) => {
  const staffData = await dbClient.query.vendorStaffTable.findFirst({
    where: and(
      eq(vendorStaffTable.id, staffId), // check staffId
      eq(vendorStaffTable.storeId, storeId), // check storeId
    ),
    columns: {
      phoneNumber: false,
      updatedAt: false,
      avatarId: false,
      addedBy: false,
      removedBy: false,
    },
    with: {
      avatar: {
        columns: {
          id: true,
          url: true,
          alt: true,
          publicId: true,
        },
      },
    },
  });

  if (!staffData) {
    throw new BadRequestError('Vendor staff not found');
  }

  return staffData;
};

const createNewVendorStaff = async (
  storeId: number,
  currentStaffAccountId: number,
  staffData: TCreateVendorStaff,
) => {
  let account = null;
  // check account is exists
  const accounts = await dbClient
    .select()
    .from(accountTable)
    .where(eq(accountTable.email, staffData.email))
    .limit(1);

  if (accounts.length > 0) {
    account = accounts[0];
  }

  const hash = await argon.hash(staffData.password);

  if (!account) {
    const accounts = await dbClient
      .insert(accountTable)
      .values({
        email: staffData.email,
        role: 'vendor',
        password: hash,
      })
      .returning();

    account = accounts[0];
  }

  const newVendorStaff = await dbClient
    .insert(vendorStaffTable)
    .values({
      accountId: account.id,
      firstName: staffData.firstName,
      lastName: staffData.lastName,
      email: staffData.email,
      role: 'staff',
      storeId,
      phoneNumber: staffData.phoneNumber,
      addedBy: currentStaffAccountId,
    })
    .returning();

  return newVendorStaff[0];
};

const updateVendorStaffData = async (
  storeId: number,
  staffId: number,
  data: TUpdateVendorStaff,
) => {
  const updatedVendorStaff = await dbClient
    .update(vendorStaffTable)
    .set({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    })
    .where(
      and(
        eq(vendorStaffTable.id, staffId), // check staffId
        eq(vendorStaffTable.storeId, storeId), // check storeId
      ),
    )
    .returning();

  return updatedVendorStaff[0];
};

const deleteVendorStaff = async (storeId: number, staffId: number) => {
  await dbClient.delete(vendorStaffTable).where(
    and(
      eq(vendorStaffTable.id, staffId), // check staffId
      eq(vendorStaffTable.storeId, storeId), // check storeId
    ),
  );
};

export {
  getAllVendorStaffs,
  getVendorStaffData,
  createNewVendorStaff,
  updateVendorStaffData,
  deleteVendorStaff,
};
