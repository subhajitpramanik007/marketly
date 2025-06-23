import { env } from '@marketly/config';
import { TUserType } from '@marketly/lib/schemas/auth';
import { Response, CookieOptions } from 'express';
import ms, { StringValue } from 'ms';
import {
  ACCESS_TOKEN_NAMESPACE,
  REFRESH_TOKEN_NAMESPACE,
  IS_AUTHENTICATED_NAMESPACE,
  LOGGED_IN_AS_NAMESPACE,
} from '@/constants/tokens.constants.js';

export async function setCookie(
  res: Response,
  name: string,
  value: string,
  options?: CookieOptions,
) {
  res.cookie(name, value, {
    ...options,
    httpOnly: true,
  });
}

export async function removeCookie(res: Response, name: string) {
  res.clearCookie(name);
}

export async function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
  role: TUserType,
) {
  await setCookie(res, ACCESS_TOKEN_NAMESPACE, accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
  });
  await setCookie(res, REFRESH_TOKEN_NAMESPACE, refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: ms(env.REFRESH_TOKEN_EXPIRES_IN as StringValue),
  });
  await setCookie(res, IS_AUTHENTICATED_NAMESPACE, 'true', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
  });
  await setCookie(res, LOGGED_IN_AS_NAMESPACE, role, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
  });
}

export async function removeAuthCookies(res: Response) {
  await removeCookie(res, ACCESS_TOKEN_NAMESPACE);
  await removeCookie(res, REFRESH_TOKEN_NAMESPACE);
  await removeCookie(res, IS_AUTHENTICATED_NAMESPACE);
  await removeCookie(res, LOGGED_IN_AS_NAMESPACE);
}
