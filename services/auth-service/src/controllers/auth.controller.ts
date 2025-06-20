import { userLoginSchema } from '@marketly/lib/schemas/auth';
import {
  ApiResponse,
  asyncHandler,
  BadRequestError,
  UnauthorizedError,
  zodValidation,
} from '@marketly/http';

import { checkUserType, createUserSession } from '../services/common.service';
import {
  checkVendorRegistration,
  verifyVendorRegistrationAndCreateVendorStore,
} from '../services/auth.vendor.service';
import {
  checkConsumerRegistration,
  consumerLogin,
  verifyConsumerRegistrationandCreateAccount,
} from '../services/auth.consumer.service';
import { removeAuthCookies, setAuthCookies } from '../utils/cookies.utils';
import {
  JwtPayload,
  JwtPayloadWithRole,
  signInJwtToken,
  verifyRefreshToken,
} from '../utils/jwt.utils';
import { REFRESH_TOKEN_NAMESPACE } from 'src/constants/tokens.constants';
import { dbClient, eq } from '@marketly/drizzle/client';
import { accountTable, sessionTable } from '@marketly/drizzle/schema';
import { env } from '@marketly/config';

// Registration check for consumer and vendor, send verification otp
export const registrationController = asyncHandler(async (req, res) => {
  const userType = checkUserType(req.query);

  if (userType === 'consumer') {
    await checkConsumerRegistration(req.body);
  }

  if (userType === 'vendor') {
    await checkVendorRegistration(req.body);
  }

  res.status(200).json(new ApiResponse(200, null, 'Verification otp send your email'));
});

// Verify registration otp and create user
export const verifyRegistrationController = asyncHandler(async (req, res) => {
  const userType = checkUserType(req.query);

  if (userType === 'vendor') {
    const vendorData = await verifyVendorRegistrationAndCreateVendorStore(req.body);

    const jwtPayload: JwtPayload = {
      id: vendorData.account.id.toString(),
      email: vendorData.account.email,
    };

    const accessToken = await signInJwtToken(jwtPayload, userType);
    const refreshToken = await signInJwtToken(jwtPayload, userType, 'refresh');

    const { id, role } = vendorData.account;
    await createUserSession(req, id, role, refreshToken);

    await setAuthCookies(res, accessToken, refreshToken, vendorData.account.role);

    res.status(201).json(
      new ApiResponse(
        201,
        {
          ...vendorData,
          accessToken,
        },
        'Registered successfully',
      ),
    );
  }

  if (userType === 'consumer') {
    const customerData = await verifyConsumerRegistrationandCreateAccount(req.body);

    const jwtPayload: JwtPayload = {
      id: customerData.account.id.toString(),
      email: customerData.account.email,
    };

    const accessToken = await signInJwtToken(jwtPayload, userType);
    const refreshToken = await signInJwtToken(jwtPayload, userType, 'refresh');

    const { id, role } = customerData.account;
    await createUserSession(req, id, role, refreshToken);

    await setAuthCookies(res, accessToken, refreshToken, customerData.account.role);

    res.status(201).json(
      new ApiResponse(
        201,
        {
          ...customerData,
          accessToken,
        },
        'Registered successfully',
      ),
    );
  }
});

// Login controller - consumer and vendor
export const loginController = asyncHandler(async (req, res) => {
  const userType = checkUserType(req.query);
  const data = zodValidation(userLoginSchema, req.body);

  let response;

  if (userType === 'consumer') {
    response = await consumerLogin(data);
  }

  if (userType === 'vendor') {
    response = await consumerLogin(data);
  }

  if (!response) throw new BadRequestError('Invalid credentials');

  const jwtPayload: JwtPayload = { id: response.id.toString(), email: response.email };

  const accessToken = await signInJwtToken(jwtPayload, userType);
  const refreshToken = await signInJwtToken(jwtPayload, userType, 'refresh');

  await createUserSession(req, response.id, response.role, refreshToken);

  await setAuthCookies(res, accessToken, refreshToken, response.role);

  res.status(200).json(new ApiResponse(200, { user: response }, 'Logged in successfully'));
});

// Logout controller
export const logoutController = asyncHandler(async (req, res) => {
  await removeAuthCookies(res);
  res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'));
});

// Refresh token
export const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_NAMESPACE];

  if (!refreshToken) throw new UnauthorizedError('Refresh token not found');

  const session = await dbClient.query.sessionTable.findFirst({
    where: eq(sessionTable.refreshToken, refreshToken),
  });
  if (!session) {
    throw new UnauthorizedError('Your refresh token is not valid');
  }

  if (session.revokedAt || session.expiresAt < new Date()) {
    throw new UnauthorizedError('Your refresh token is not valid');
  }

  const account = await dbClient.query.accountTable.findFirst({
    where: eq(accountTable.id, session.accountId),
  });
  if (!account) throw new UnauthorizedError('Your refresh token is not valid');

  const payload: JwtPayloadWithRole = {
    id: account.id.toString(),
    email: account.email,
    role: account.role,
  };

  const accessToken = await signInJwtToken(payload, payload.role);
  const newRefreshToken = await signInJwtToken(payload, payload.role, 'refresh');

  const updateSession = await dbClient
    .update(sessionTable)
    .set({
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })
    .where(eq(sessionTable.refreshToken, refreshToken))
    .returning();

  await setAuthCookies(res, accessToken, newRefreshToken, payload.role);

  res.status(200).json(new ApiResponse(200, { accessToken }, 'Token refresh successfully'));
});
