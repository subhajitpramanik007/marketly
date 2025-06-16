import { env } from '@marketly/config';
import { Response, CookieOptions } from 'express';
import ms, { StringValue } from 'ms';

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

export async function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  await setCookie(res, '_accessToken', accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
  });
  await setCookie(res, '_refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: ms(env.REFRESH_TOKEN_EXPIRES_IN as StringValue),
  });
  await setCookie(res, 'isAuthenticated', 'true', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
  });
}

export async function removeAuthCookies(res: Response) {
  await removeCookie(res, '_accessToken');
  await removeCookie(res, '_refreshToken');
  await removeCookie(res, 'isAuthenticated');
}

export async function setVendorAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  await setAuthCookies(res, accessToken, refreshToken);
  await setCookie(res, 'isVendor', 'true', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
  });
}

export async function removeVendorAuthCookies(res: Response) {
  await removeAuthCookies(res);
  await removeCookie(res, 'isVendor');
}
