import {
  checkAccountExist,
  sendVerificationOtp,
  verifyRegistrationOtp,
} from '@/services/common.service';
import {
  createNewConsumer,
  getConsumerAccountByEmail,
  getConsumerByEmail,
  markerConsumerAsVerified,
} from '@/services/consumer.service';
import { removeAuthCookies, setAuthCookies } from '@/utils/cookies.utils';
import { JwtPayload, signInJwtToken } from '@/utils/jwt.utils';
import { checkOtpRestrictions } from '@/utils/otp.utils';
import { verifyPassword } from '@/utils/password.utils';
import { ApiResponse, asyncHandler, BadRequestError, zodValidation } from '@marketly/http';
import {
  consumerRegistrationEmailVerificationSchema,
  consumerRegistrationSchema,
  resendEmailSchema,
  userLoginSchema,
} from '@marketly/lib/schemas/auth';

export const registerConsumerCtrl = asyncHandler(async (req, res) => {
  const validatedData = zodValidation(consumerRegistrationSchema, req.body);

  await checkAccountExist(validatedData.email);

  const createdAccount = await createNewConsumer(validatedData);

  await checkOtpRestrictions(validatedData.email, 'consumer');

  await sendVerificationOtp(validatedData.email, 'consumer');

  const jwtPayload: JwtPayload = {
    email: createdAccount.email,
    id: createdAccount.id.toString(),
  };

  const accessToken = await signInJwtToken(jwtPayload, 'consumer');
  const refreshToken = await signInJwtToken(jwtPayload, 'consumer', 'refresh');

  await setAuthCookies(res, accessToken, refreshToken, 'consumer');

  res
    .status(201)
    .json(new ApiResponse(201, { accessToken }, 'User registration otp sent successfully'));
});

export const resendVerificationOtpCtrl = asyncHandler(async (req, res) => {
  const validatedData = zodValidation(resendEmailSchema, req.body);

  const isEmailExists = await getConsumerByEmail(validatedData.email);

  if (!isEmailExists) {
    throw new BadRequestError('Email does not exist');
  }

  await checkOtpRestrictions(validatedData.email, 'consumer');

  await sendVerificationOtp(validatedData.email, 'consumer');

  res.status(200).json(new ApiResponse(200, null, 'OTP resent successfully'));
});

export const verifyConsumerCtrl = asyncHandler(async (req, res) => {
  const validatedData = zodValidation(consumerRegistrationEmailVerificationSchema, req.body);

  // check otp
  await verifyRegistrationOtp(validatedData.email, 'consumer', validatedData.otp);

  await markerConsumerAsVerified(validatedData.email);

  res.status(200).json(new ApiResponse(200, null, 'User verified successfully'));
});

export const loginConsumerCtrl = asyncHandler(async (req, res) => {
  const validatedData = zodValidation(userLoginSchema, req.body);

  // check if email exists
  const consumerAccount = await getConsumerAccountByEmail(validatedData.email);
  if (!consumerAccount) {
    throw new BadRequestError('Email does not exist');
  }

  if (!consumerAccount.isVerified) {
    throw new BadRequestError('User not verified');
  }

  if (!consumerAccount.password) {
    throw new BadRequestError('Select correct account provider');
  }

  // check password
  const isPasswordMatch = await verifyPassword(validatedData.password, consumerAccount.password);
  if (!isPasswordMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  const jwtPayload: JwtPayload = {
    email: consumerAccount.email,
    id: consumerAccount.id.toString(),
  };

  const accessToken = await signInJwtToken(jwtPayload, 'consumer');
  const refreshToken = await signInJwtToken(jwtPayload, 'consumer', 'refresh');

  await setAuthCookies(res, accessToken, refreshToken, 'consumer');

  res.status(200).json(new ApiResponse(200, { accessToken }, 'Login successful'));
});

export const logoutConsumerCtrl = asyncHandler(async (req, res) => {
  if (!req.currentUser) {
    throw new BadRequestError('User not logged in');
  }

  await removeAuthCookies(res);

  res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
});
