import { env } from '@marketly/config';
import { prismaClient } from '@marketly/db';
import {
  asyncHandler,
  BadRequestError,
  ConflictError,
  ApiResponse,
  ForbiddenError,
} from '@marketly/http';
import { sendEmail } from '@marketly/lib/email';
import { generateOtp } from '@marketly/lib/otp';
import {
  TResendVendorRegistrationEmail,
  TVendorForgotPassword,
  TVendorLogin,
  TVendorRegistration,
  TVendorRegistrationEmailVerification,
  TVendorResetPassword,
} from '@marketly/lib/schemas';
import {
  checkOtpRestrictions,
  deleteOtpRestrictions,
  getStoredOtp,
  removeAuthCookies,
  setVendorAuthCookies,
  setOtpRestrictions,
  signInJwtToken,
  verifyRefreshToken,
} from '@marketly/auth/services';
import { hashPassword, verifyPassword } from '@marketly/auth/password';

/**
 * Vendor registration
 * - validate user input-{firstName, lastName?, email, password, otp}
 * - check if vendor exists
 * - check otp restrictions
 * - send verification email
 * - save otp to redis
 * - return success
 */
export const vendorRegistration = asyncHandler(async (req, res) => {
  const { email, storeName } = req.body as TVendorRegistration;

  // check if vendor exists
  const existingVendor = await prismaClient.vendor.findFirst({
    where: {
      OR: [{ email: email }, { store_name: storeName }],
    },
  });
  if (existingVendor) {
    const emailExists = existingVendor.email === email;
    throw new ConflictError(emailExists ? 'Email already exists' : 'Store name already exists');
  }

  //  check otp restrictions
  await checkOtpRestrictions(email, 'vendor');

  // send verification email
  const otp = generateOtp(6);
  await sendEmail(email, 'Verify your email', 'verify-email', { otp });

  // save otp to redis
  await setOtpRestrictions(email, otp, 'vendor');

  res.status(200).json(new ApiResponse(200, {}, 'Vendor registration otp sent successfully'));
});

/**
 * Verify vendor registration otp
 * - validate user input-{firstName, lastName?, email, password, otp}
 * - check if otp is valid
 * - create user
 * - create vendor
 * - create vendor staff - vendor admin
 * - send welcome email
 * - send new registration alert to site admin
 */
export const verifyVendorRegistration = asyncHandler(async (req, res) => {
  const { email, otp, firstName, lastName, password, storeName, phoneNumber } =
    req.body as TVendorRegistrationEmailVerification;

  const storedOtp = await getStoredOtp(email, 'vendor');

  if (!storedOtp) throw new BadRequestError('Invalid otp code provided');
  if (storedOtp !== otp) throw new BadRequestError('Invalid otp code provided');

  await deleteOtpRestrictions(email, 'vendor');

  const vendorAccount = await prismaClient.account.create({
    data: {
      email,
      role: 'Vendor',
    },
  });

  const hashedPassword = await hashPassword(password);

  await prismaClient.userPassword.create({
    data: {
      user_id: vendorAccount.id,
      hash: hashedPassword,
    },
  });

  const vendor = await prismaClient.vendor.create({
    data: {
      created_by_id: vendorAccount.id,
      email,
      store_name: storeName,
      phone_numbers: [phoneNumber],
    },
  });

  await prismaClient.vendorStaff.create({
    data: {
      vendor_id: vendor.id,
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      permission: 'Admin',
      phone_number: phoneNumber,
      account_id: vendorAccount.id,
    },
  });

  res.status(201).json(new ApiResponse(201, {}, 'Vendor registered successfully'));
});

/**
 * Resend vendor registration otp
 * - validate user input-{email}
 * - check if otp is valid
 * - send verification email
 * - save otp to redis
 * - return success
 */
export const resendVendorRegistration = asyncHandler(async (req, res) => {
  const { email, storeName } = req.body as TResendVendorRegistrationEmail;

  const existingVendor = await prismaClient.vendor.findFirst({
    where: {
      OR: [{ email: email }, { store_name: storeName }],
    },
  });

  if (existingVendor) {
    const emailExists = existingVendor.email === email;
    throw new ConflictError(emailExists ? 'Email already exists' : 'Store name already exists');
  }

  //  check otp restrictions
  await checkOtpRestrictions(email, 'vendor');

  // send verification email
  const otp = generateOtp(6);
  await sendEmail(email, 'Verify your email', 'verify-email', { otp });

  // save otp to redis
  await setOtpRestrictions(email, otp, 'vendor');

  res.status(200).json(new ApiResponse(200, {}, 'Vendor registration otp sent successfully'));
});

/**
 * Vendor login
 * - validate user input-{email, password}
 * - check if user exists
 * - check if password is correct
 * - sign in user
 * - return success
 */
export const vendorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body as TVendorLogin;

  const vendorStaff = await prismaClient.vendorStaff.findFirst({
    where: {
      email,
    },
    include: {
      account: true,
    },
  });

  if (!vendorStaff) throw new BadRequestError('Vendor does not exist');

  const isValid = await verifyPassword(password, vendorStaff.password);
  if (!isValid) throw new BadRequestError('Invalid credentials');

  const jwtPayload = { id: vendorStaff.account_id, email: vendorStaff.email };

  const accessToken = await signInJwtToken(jwtPayload, 'vendor');
  const refreshToken = await signInJwtToken(jwtPayload, 'vendor', 'refresh');

  await prismaClient.session.create({
    data: {
      user_id: vendorStaff.account_id,
      refresh_token: refreshToken,
      role: 'Vendor',
      expires_at: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN),
      user_agent: req.headers['user-agent'],
      ip_address: req.ip,
    },
  });

  setVendorAuthCookies(res, accessToken, refreshToken);
  res.json(new ApiResponse(200, { accessToken }, 'Logged in successfully'));
});

/**
 * Vendor logout
 * - remove auth cookies
 * - update session
 * - return success
 */
export const vendorLogout = asyncHandler(async (req, res) => {
  await removeAuthCookies(res);

  await prismaClient.session.updateMany({
    where: {
      refresh_token: req.cookies._refreshToken,
    },
    data: {
      is_active: false,
    },
  });

  res.status(200).json(new ApiResponse(200, {}, 'Logged out successfully'));
});

/**
 * Vendor refresh token
 * - validate refresh token
 * - check if user exists
 * - sign in user
 * - return success
 */
export const vendorRefreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies._refreshToken;

  if (!refreshToken) throw new BadRequestError('Refresh token not found');

  const payload = await verifyRefreshToken(refreshToken);

  if (payload.role !== 'vendor') throw new ForbiddenError('You are not a vendor');

  const session = await prismaClient.session.findUnique({
    where: {
      refresh_token: refreshToken,
      is_active: true,
    },
  });

  if (!session) throw new ForbiddenError('Invalid refresh token');

  const accessToken = await signInJwtToken(payload, 'vendor');
  const newRefreshToken = await signInJwtToken(payload, 'vendor', 'refresh');

  setVendorAuthCookies(res, accessToken, newRefreshToken);

  await prismaClient.session.update({
    where: {
      refresh_token: refreshToken,
    },
    data: {
      refresh_token: newRefreshToken,
      expires_at: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN),
    },
  });

  res.status(200).json(new ApiResponse(200, { accessToken }, 'Refreshed token successfully'));
});

/**
 * Vendor forgot password - only for vendors admin
 * - validate user input-{email}
 * - If user not exists, throw error
 * - send verification email
 * - return success
 */
export const vendorForgotPassword = asyncHandler(async (req, res) => {
  const { email, storeName } = req.body as TVendorForgotPassword;

  const vendor = await prismaClient.vendor.findFirst({
    where: {
      OR: [{ email: email }, { store_name: storeName }],
    },
    include: {
      staffs: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!vendor) throw new BadRequestError('Vendor does not exist');

  //  check otp restrictions
  await checkOtpRestrictions(email, 'vendor');

  // send verification email
  const otp = generateOtp(6);
  await sendEmail(email, 'Reset your password', 'reset-password', { otp });

  // save otp to redis
  await setOtpRestrictions(email, otp, 'vendor');

  res.status(200).json(new ApiResponse(200, {}, 'Password reset otp sent successfully'));
});

/**
 * vendor reset password - only for vendors admin
 * - validate user input-{email, otp, password, confirmPassword}
 * - check if password is correct
 * - update password
 * - return success
 */
export const vendorResetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password, confirmPassword } = req.body as TVendorResetPassword;

  const storedOtp = await getStoredOtp(email, 'vendor');

  if (!storedOtp) throw new BadRequestError('Invalid otp code provided');
  if (storedOtp !== otp) throw new BadRequestError('Invalid otp code provided');

  const vendor = await prismaClient.vendor.findFirst({
    where: {
      email,
    },
  });

  if (!vendor) throw new BadRequestError('Vendor does not exist');

  if (password !== confirmPassword) throw new BadRequestError('Passwords do not match');

  const vendorStaff = await prismaClient.vendorStaff.findFirst({
    where: {
      email: vendor.email,
      vendor_id: vendor.id,
    },
  });

  if (!vendorStaff) throw new BadRequestError('Vendor staff does not exist');

  if (vendorStaff.permission !== 'Admin')
    throw new BadRequestError('You do not have permission to reset the password');

  const hashedPassword = await hashPassword(password);
  if (hashedPassword === vendorStaff.password)
    throw new BadRequestError('New password cannot be the same as the old password');

  await prismaClient.vendorStaff.update({
    where: {
      email: vendor.email,
      vendor_id: vendor.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prismaClient.account.update({
    where: {
      id: vendorStaff.account_id,
    },
    data: {
      password: {
        update: {
          hash: hashedPassword,
        },
      },
    },
  });

  await deleteOtpRestrictions(email, 'vendor');

  res.status(200).json(new ApiResponse(200, {}, 'Password reset successfully'));
});
