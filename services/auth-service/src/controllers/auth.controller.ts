import { env } from '@marketly/config';
import {
  ApiResponse,
  asyncHandler,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
  zodValidationFromSchemas,
  zodValidation,
} from '@marketly/http';

import {
  userTypeEnumSchema,
  consumerRegistrationSchema,
  vendorRegistrationSchema,
  userTypeQuerySchema,
  consumerRegistrationEmailVerificationSchema,
  vendorRegistrationEmailVerificationSchema,
  userLoginSchema,
  userForgotPasswordSchema,
  userResetPasswordSchema,
} from '@marketly/lib/schemas/auth';

import {
  checkResetPasswordOtp,
  checkRestrictionsForRegistration,
  createNewAccount,
  sendPasswordResetOtp,
  sendVerificationOtp,
} from '../services/auth.service';

import { prismaClient } from '@marketly/db';
import { hashPassword, verifyPassword } from '../utils/password.utils';
import { removeAuthCookies, setAuthCookies } from '../utils/cookies.utils';
import { signInJwtToken, verifyRefreshToken } from '../utils/jwt.utils';
import { REFRESH_TOKEN_NAMESPACE } from '../constants/tokens.constants';
import { checkOtpRestrictions, deleteOtpRestrictions } from '../utils/otp.utils';

export const registrationController = asyncHandler(async (req, res) => {
  const { userType } = zodValidation(userTypeQuerySchema, req.query);
  if (userType === 'admin') throw new ForbiddenError("Admin can't register here");

  const data = zodValidationFromSchemas(
    { consumer: consumerRegistrationSchema, vendor: vendorRegistrationSchema },
    userType,
    req.body,
  );

  await checkRestrictionsForRegistration(userType, data.email);

  await sendVerificationOtp(userType, data.email);

  res.status(200).json(new ApiResponse(200, {}, 'Verification otp send your email'));
});

export const verifyRegistrationController = asyncHandler(async (req, res) => {
  const { userType } = zodValidation(userTypeQuerySchema, req.query);
  if (userType === 'admin') throw new ForbiddenError("Admin can't register here");

  const data = zodValidationFromSchemas(
    {
      consumer: consumerRegistrationEmailVerificationSchema,
      vendor: vendorRegistrationEmailVerificationSchema,
    },
    userType,
    req.body,
  );

  const user = await createNewAccount(userType, data);

  await deleteOtpRestrictions(userType, data.email);

  res.status(200).json(
    new ApiResponse(
      201,
      {
        [userType]: user,
      },
      'User registered successfully',
    ),
  );
});

export const resendRegistrationEmailController = asyncHandler(async (req, res) => {
  const { userType } = zodValidation(userTypeQuerySchema, req.query);
  if (userType === 'admin') throw new ForbiddenError("Admin can't register here");

  const data = zodValidationFromSchemas(
    { consumer: consumerRegistrationSchema, vendor: vendorRegistrationSchema },
    userType,
    req.body,
  );

  await checkRestrictionsForRegistration(
    userType,
    data.email,
    'storeName' in data ? data.storeName : undefined,
  );

  await sendVerificationOtp(userType, data.email);

  res.status(200).json(new ApiResponse(200, {}, 'Verification otp send your email'));
});

export const loginController = asyncHandler(async (req, res) => {
  const { userType } = zodValidation(userTypeEnumSchema, req.query);
  if (userType === 'admin') throw new ForbiddenError("Admin can't login here");

  const data = zodValidation(userLoginSchema, req.body);

  const user = await prismaClient.account.findUnique({
    where: { email: data.email },
    include: {
      password: true,
      consumers: userType === 'consumer',
      vendor_staffs: userType === 'vendor',
    },
  });

  if (
    !user ||
    !user.password ||
    (userType === 'consumer' && !user.consumers) ||
    (userType === 'vendor' && !user.vendor_staffs)
  ) {
    throw new ValidationError('Invalid credentials');
  }

  const isValid = await verifyPassword(data.password, user.password.hash);
  if (!isValid) {
    throw new ValidationError('Invalid credentials');
  }

  const jwtPayload = { id: user.id, email: user.email, role: user.role };

  const accessToken = await signInJwtToken(jwtPayload, userType);
  const refreshToken = await signInJwtToken(jwtPayload, userType, 'refresh');

  await prismaClient.session.create({
    data: {
      user_id: user.id,
      refresh_token: refreshToken,
      expires_at: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN),
      user_agent: req.headers['user-agent'],
      ip_address: req.ip,
      role: user.role,
    },
  });

  setAuthCookies(res, accessToken, refreshToken, userType);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        [userType]: user[userType === 'consumer' ? 'consumers' : 'vendor_staffs'],
        accessToken,
        refreshToken,
      },
      'User logged in successfully',
    ),
  );
});

export const logoutController = asyncHandler(async (req, res) => {
  removeAuthCookies(res);
  res.status(200).json(new ApiResponse(200, {}, 'User logged out successfully '));
});

export const refreshSessionController = asyncHandler(async (req, res) => {
  const { userType } = zodValidation(userTypeEnumSchema, req.query);
  if (userType === 'admin') throw new ForbiddenError("Admin can't refresh session here");

  const refreshToken = req.cookies[REFRESH_TOKEN_NAMESPACE];
  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token not found');
  }

  const payload = await verifyRefreshToken(refreshToken);

  const session = await prismaClient.session.findUnique({
    where: {
      refresh_token: refreshToken,
      is_active: true,
    },
  });

  if (!session) throw new UnauthorizedError('Invalid refresh token');

  const jwtPayload = { id: payload.id, email: payload.email, role: payload.role };

  const accessToken = await signInJwtToken(jwtPayload, userType);

  res.status(200).json(new ApiResponse(200, { accessToken }, 'Session refreshed successfully'));
});

export const forgotPasswordController = asyncHandler(async (req, res) => {
  const { userType } = zodValidation(userTypeEnumSchema, req.query);
  if (userType === 'admin') throw new ForbiddenError("Admin can't reset password here");

  const { email } = zodValidation(userForgotPasswordSchema, req.body);

  const user = await prismaClient.account.findUnique({
    where: { email },
    include: {
      consumers: userType === 'consumer',
      vendor_staffs: userType === 'vendor',
    },
  });

  if (
    !user ||
    (userType === 'consumer' && !user.consumers) ||
    (userType === 'vendor' && !user.vendor_staffs)
  ) {
    throw new BadRequestError('User not found');
  }

  await checkOtpRestrictions(email, userType);

  await sendPasswordResetOtp(userType, email);

  res.status(200).json(new ApiResponse(200, {}, 'Password reset otp sent to your email'));
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  const { userType } = zodValidation(userTypeEnumSchema, req.query);
  if (userType === 'admin') throw new ForbiddenError("Admin can't reset password here");

  const data = zodValidation(userResetPasswordSchema, req.body);

  const user = await prismaClient.account.findUnique({
    where: { email: data.email },
    include: {
      consumers: userType === 'consumer',
      vendor_staffs: userType === 'vendor',
    },
  });

  if (
    !user ||
    (userType === 'consumer' && !user.consumers) ||
    (userType === 'vendor' && !user.vendor_staffs)
  ) {
    throw new BadRequestError('User not found');
  }

  await checkResetPasswordOtp(userType, data.email, data.otp);

  const hashedPassword = await hashPassword(data.password);

  await prismaClient.userPassword.update({
    where: { user_id: user.id },
    data: { hash: hashedPassword },
  });

  if (userType === 'vendor') {
    await prismaClient.vendorStaff.update({
      where: { email: data.email },
      data: { password: hashedPassword },
    });
  }

  await prismaClient.session.updateMany({
    where: { user_id: user.id, is_active: true },
    data: { is_active: false },
  });

  await deleteOtpRestrictions(data.email, userType);
  res.status(200).json(new ApiResponse(200, {}, 'Password reset successfully'));
});
