import { and, dbClient, eq } from '@marketly/drizzle/client';
import { accountTable, consumerTable } from '@marketly/drizzle/schema';

import { BadRequestError, zodValidation } from '@marketly/http';

import {
  consumerRegistrationSchema,
  consumerRegistrationEmailVerificationSchema,
  TConsumerRegistration,
  TUserLogin,
} from '@marketly/lib/schemas/auth';

import { hashPassword, verifyPassword } from '../utils/password.utils';
import { checkOtpRestrictions } from '../utils/otp.utils';
import { checkAccountExist, sendVerificationOtp, verifyRegistrationOtp } from './common.service';

/**
 * Check consumer before registration
 *
 * - check email
 * - check otp restrictions
 * - send verification email
 */
const checkConsumerRegistration = async (data: unknown) => {
  const { email } = zodValidation(consumerRegistrationSchema, data);

  await checkAccountExist(email);

  await checkOtpRestrictions(email, 'consumer');

  await sendVerificationOtp(email, 'consumer');
};

/**
 * Create consumer account
 */
const createConsumerAccount = async (data: TConsumerRegistration) => {
  const { email, password, firstName, lastName } = data;

  const hash = await hashPassword(password);

  const [account] = await dbClient
    .insert(accountTable)
    .values({
      email,
      role: 'consumer',
      password: hash,
    })
    .returning();

  if (!account) throw new BadRequestError('Failed to create account');

  const [consumer] = await dbClient
    .insert(consumerTable)
    .values({
      accountId: account.id,
      firstName,
      email,
      lastName,
    })
    .returning();

  if (!consumer) throw new BadRequestError('Failed to create consumer');

  return { account, consumer };
};

/**
 * Verify consumer registration otp and create user
 */
const verifyConsumerRegistrationandCreateAccount = async (data: unknown) => {
  const consumerData = zodValidation(consumerRegistrationEmailVerificationSchema, data);

  const { email, otp } = consumerData;

  await checkAccountExist(email);

  await verifyRegistrationOtp(email, 'consumer', otp);

  return createConsumerAccount(consumerData);
};

const consumerLogin = async (data: TUserLogin) => {
  const { email, password } = data;

  const [account] = await dbClient
    .select()
    .from(accountTable)
    .where(and(eq(accountTable.email, email), eq(accountTable.role, 'consumer')))
    .limit(1);

  if (!account) throw new BadRequestError('Account not found');

  const isPasswordMatch = await verifyPassword(password, account.password);

  if (!isPasswordMatch) throw new BadRequestError('Invalid credentials');

  const { password: _, ...rest } = account;

  return rest;
};

export { checkConsumerRegistration, verifyConsumerRegistrationandCreateAccount, consumerLogin };
