import { and, dbClient, eq } from '@marketly/drizzle/client';
import { accountTable, vendorStaffTable, vendorStoreTable } from '@marketly/drizzle/schema';

import { BadRequestError, zodValidation } from '@marketly/http';

import {
  vendorRegistrationSchema,
  vendorRegistrationEmailVerificationSchema,
  TVendorRegistration,
  TUserLogin,
} from '@marketly/lib/schemas/auth';

import { checkOtpRestrictions } from '../utils/otp.utils';
import { checkAccountExist, sendVerificationOtp, verifyRegistrationOtp } from './common.service';
import { hashPassword, verifyPassword } from '../utils/password.utils';

/**
 * check vendor store name already exist
 */
const checkVendorStoreName = async (storeName: string) => {
  const existStoreName = await dbClient.query.vendorStoreTable.findFirst({
    where: eq(vendorStoreTable.storeName, storeName),
  });
  if (existStoreName) {
    throw new BadRequestError('Store name already exist');
  }
};

/**
 * Check vendor before registration
 *
 * - check email
 * - check store name
 * - check otp restrictions
 * - send verification email
 */
const checkVendorRegistration = async (data: unknown) => {
  const { email, storeName } = zodValidation(vendorRegistrationSchema, data);

  await checkAccountExist(email);

  await checkVendorStoreName(storeName);

  await checkOtpRestrictions(email, 'vendor');

  await sendVerificationOtp(email, 'vendor');
};

/**
 * Verify vendor registration otp and create user
 *
 * - validate user input-{firstName, lastName?, email, password, otp}
 * - check account exist
 * - verify otp
 * - create vendor store and vendor staff as owner
 */
const verifyVendorRegistrationAndCreateVendorStore = async (data: unknown) => {
  const vendorData = zodValidation(vendorRegistrationEmailVerificationSchema, data);

  const { email, otp } = vendorData;

  await checkAccountExist(email);

  await checkVendorStoreName(vendorData.storeName);

  await verifyRegistrationOtp(email, 'vendor', otp);

  return createVendorStore(vendorData);
};

/**
 * Create vendor store
 */
const createVendorStore = async (data: TVendorRegistration) => {
  const { email, password, firstName, lastName, storeName, phoneNumber } = data;

  const hash = await hashPassword(password);

  const [account] = await dbClient
    .insert(accountTable)
    .values({
      email,
      role: 'vendor',
      password: hash,
    })
    .returning();

  if (!account) throw new BadRequestError('Failed to create account');

  const [vendorStore] = await dbClient
    .insert(vendorStoreTable)
    .values({
      createdById: account.id,
      storeName,
      storeEmail: email,
      storePhoneNumber: phoneNumber ?? '1234567890',
    })
    .returning();

  if (!vendorStore) throw new BadRequestError('Failed to create vendor store');

  const [staff] = await dbClient
    .insert(vendorStaffTable)
    .values({
      email,
      role: 'owner',
      accountId: account.id,
      firstName,
      storeId: vendorStore.id,
      lastName,
      phoneNumber,
    })
    .returning();

  if (!staff) throw new BadRequestError('Failed to create vendor staff');

  return { account, vendorStore, staff };
};

/**
 * Vendor login
 */
const vendorLogin = async (data: TUserLogin) => {
  const { email, password } = data;

  const [account] = await dbClient
    .select()
    .from(accountTable)
    .where(and(eq(accountTable.role, 'vendor'), eq(accountTable.email, email)))
    .limit(1);

  if (!account) throw new BadRequestError('Account not found');

  const isPasswordMatch = await verifyPassword(password, account.password);

  if (!isPasswordMatch) throw new BadRequestError('Invalid credentials');

  const { password: _, ...rest } = account;

  return rest;
};

export { checkVendorRegistration, verifyVendorRegistrationAndCreateVendorStore };
