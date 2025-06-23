import { and, dbClient, eq } from '@marketly/drizzle';
import {
  accountTable,
  sessionTable,
  vendorStaffTable,
  vendorStoreTable,
} from '@marketly/drizzle/db/schemas';
import {
  ApiResponse,
  asyncHandler,
  BadRequestError,
  UnauthorizedError,
  zodValidation,
} from '@marketly/http';
import {
  checkAccountExist,
  sendVerificationOtp,
  verifyRegistrationOtp,
} from '@/services/common.service';
import { checkOtpRestrictions } from '@/utils/otp.utils';

import {
  vendorRegistrationEmailSchema,
  vendorRegistrationEmailVerificationSchema,
  vendorRegistrationSchema,
} from '@marketly/lib/schemas/vendor';
import { setAuthCookies } from '@/utils/cookies.utils';
import { JwtPayload, signInJwtToken } from '@/utils/jwt.utils';
import { userLoginSchema } from '@marketly/lib/schemas/auth';
import { hashPassword, verifyPassword } from '@/utils/password.utils';

export const register = asyncHandler(async (req, res) => {
  const { email } = zodValidation(vendorRegistrationEmailSchema, req.body);

  await checkAccountExist(email);

  await checkOtpRestrictions(email, 'vendor');

  await sendVerificationOtp(email, 'vendor');

  res.status(200).json(new ApiResponse(200, null, 'OTP sent successfully'));
});

export const registrationVerify = asyncHandler(async (req, res) => {
  const { email, otp, password } = zodValidation(
    vendorRegistrationEmailVerificationSchema,
    req.body,
  );

  await checkAccountExist(email);

  await verifyRegistrationOtp(email, 'vendor', otp);

  const [account] = await dbClient
    .insert(accountTable)
    .values({ email, role: 'vendor', password: await hashPassword(password) })
    .returning();

  const jwtPayload: JwtPayload = {
    email: account.email,
    id: account.id.toString(),
  };

  const accessToken = await signInJwtToken(jwtPayload, 'vendor');
  const refreshToken = await signInJwtToken(jwtPayload, 'vendor', 'refresh');

  await dbClient.insert(sessionTable).values({
    accountId: account.id,
    refreshToken: refreshToken,
    role: 'vendor',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    userAgent: req.headers['user-agent'] as string,
    ipAddress: Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
  });

  await setAuthCookies(res, accessToken, refreshToken, 'vendor');

  res.status(200).json(new ApiResponse(200, null, 'Email verified successfully'));
});

export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = zodValidation(vendorRegistrationEmailSchema, req.body);

  await checkAccountExist(email);

  await checkOtpRestrictions(email, 'vendor');

  await sendVerificationOtp(email, 'vendor');

  res.status(200).json(new ApiResponse(200, null, 'OTP resent successfully'));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = zodValidation(userLoginSchema, req.body);

  const [account] = await dbClient
    .select()
    .from(accountTable)
    .where(and(eq(accountTable.email, email), eq(accountTable.role, 'vendor')))
    .limit(1);

  if (!account || account.role !== 'vendor') throw new BadRequestError('Account not found');
  if (!account.password) throw new BadRequestError('Select correct account provider');

  const isPasswordMatch = await verifyPassword(password, account.password);
  if (!isPasswordMatch) throw new UnauthorizedError('Invalid credentials');

  const jwtPayload: JwtPayload = {
    email: account.email,
    id: account.id.toString(),
  };

  const accessToken = await signInJwtToken(jwtPayload, 'vendor');
  const refreshToken = await signInJwtToken(jwtPayload, 'vendor', 'refresh');

  await dbClient.insert(sessionTable).values({
    accountId: account.id,
    refreshToken: refreshToken,
    role: 'vendor',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    userAgent: req.headers['user-agent'] as string,
    ipAddress: Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
  });

  await setAuthCookies(res, accessToken, refreshToken, 'vendor');

  res.status(200).json(new ApiResponse(200, null, 'Login successful'));
});

export const logout = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
});
