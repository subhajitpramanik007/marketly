import { dbClient, eq } from '@marketly/drizzle';
import { accountTable, sessionTable } from '@marketly/drizzle/db/schemas';
import { sendEmail } from '@marketly/lib/email';
import { generateOtp } from '@marketly/lib/otp';
import { TUserType, userTypeQuerySchema } from '@marketly/lib/schemas/auth';
import { BadRequestError, ConflictError, ForbiddenError, zodValidation } from '@marketly/http';

import { deleteOtpRestrictions, getStoredOtp, setOtpRestrictions } from '../utils/otp.utils';
import { Request } from 'express';

// check is not admin
function checkUserType(data: unknown) {
  const { userType } = zodValidation(userTypeQuerySchema, data);
  if (userType === 'admin') throw new ForbiddenError("Admin can't handle here");

  return userType;
}

// check account already exist
const checkAccountExist = async (email: string) => {
  const account = await dbClient.query.accountTable.findFirst({
    where: eq(accountTable.email, email),
  });

  if (account) {
    throw new ConflictError('Account already exist');
  }
};

/**
 * Send varifiaction otp via mail
 *
 * @param email
 * @param userType
 */
async function sendVerificationOtp(email: string, userType: 'consumer' | 'vendor') {
  const otp = generateOtp(6);
  await sendEmail(
    email,
    'Verify your email',
    { otp },
    { path: 'public/email-templates', name: 'verify-email' },
  );

  await setOtpRestrictions(email, otp, userType);
}

/**
 * Verify registration otp
 *
 * @param email
 * @param userType
 * @param otp
 */
async function verifyRegistrationOtp(
  email: string,
  userType: 'consumer' | 'vendor',
  otp: string | number,
) {
  const storedOtp = await getStoredOtp(email, userType);
  if (!storedOtp || storedOtp !== otp) throw new BadRequestError('Invalid otp code provided');

  await deleteOtpRestrictions(email, userType);
}

/**
 * Create session
 */
async function createUserSession(
  req: Request,
  accountId: number,
  userType: TUserType,
  refreshToken: string,
) {
  const ipAddress = Array.isArray(req.headers['x-forwarded-for'])
    ? req.headers['x-forwarded-for'][0]
    : req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

  const session = await dbClient
    .insert(sessionTable)
    .values({
      accountId,
      refreshToken: refreshToken,
      role: userType,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      userAgent: req.headers['user-agent'] as string,
      ipAddress,
      revokedAt: null,
    })
    .returning();

  return session[0];
}

/**
 * Update user session
 */
async function updateUserSession() {}

export {
  checkUserType,
  checkAccountExist,
  sendVerificationOtp,
  verifyRegistrationOtp,
  createUserSession,
};
