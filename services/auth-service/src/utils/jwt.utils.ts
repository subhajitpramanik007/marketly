import jwt from 'jsonwebtoken';
import { env } from '@marketly/config';
import ms, { StringValue } from 'ms';
import { ForbiddenError, UnauthorizedError } from '@marketly/http';
import { TUserType } from '@marketly/lib/schemas/auth';

type JwtPayload = {
  id: string;
  email: string;
};

type JwtPayloadWithRole = JwtPayload & {
  role: TUserType;
};

async function generateJwtToken(payload: object, secret: string, options?: jwt.SignOptions) {
  return jwt.sign(payload, secret, options);
}

async function verifyJwtToken(token: string, secret: string) {
  return jwt.verify(token, secret);
}

async function generateRefreshToken(
  payload: JwtPayloadWithRole,
  secret?: string,
  options?: jwt.SignOptions,
) {
  return generateJwtToken(payload, secret ?? env.REFRESH_TOKEN_SECRET, {
    expiresIn: ms(env.REFRESH_TOKEN_EXPIRES_IN as StringValue),
    ...options,
  });
}

async function generateAccessToken(
  payload: JwtPayloadWithRole,
  secret?: string,
  options?: jwt.SignOptions,
) {
  return generateJwtToken(payload, secret ?? env.JWT_SECRET, {
    expiresIn: ms(env.JWT_EXPIRES_IN as StringValue),
    ...options,
  });
}

export async function verifyAccessToken(token: string) {
  try {
    return verifyJwtToken(token, env.JWT_SECRET) as any as JwtPayloadWithRole;
  } catch {
    throw new UnauthorizedError('Invalid access token');
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    return verifyJwtToken(token, env.REFRESH_TOKEN_SECRET) as any as JwtPayloadWithRole;
  } catch {
    throw new UnauthorizedError('Invalid refresh token');
  }
}

export async function signInJwtToken(
  payload: JwtPayload,
  role: TUserType,
  type: 'access' | 'refresh' = 'access',
) {
  return type === 'access'
    ? generateAccessToken({
        ...payload,
        role,
      })
    : generateRefreshToken({
        ...payload,
        role,
      });
}

export async function verifyAccessTokenWithRole(token: string, role: 'consumer' | 'vendor') {
  const payload = await verifyAccessToken(token);
  if (payload.role !== role) throw new ForbiddenError('Invalid role');
  return payload;
}
