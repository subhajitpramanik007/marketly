import { and, dbClient, eq } from '@marketly/drizzle';
import { sessionTable } from '@marketly/drizzle/db/schemas';
import { Request } from 'express';

export const createNewSession = async (
  req: Request,
  accountId: number,
  role: 'consumer' | 'vendor',
  refreshToken: string,
) => {
  await dbClient.insert(sessionTable).values({
    accountId,
    refreshToken,
    role,
    userAgent: req.headers['user-agent'] || '',
    ipAddress: req.ip || req.connection.remoteAddress || '',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });
};

export const updateSessionRefreshToken = async (
  role: 'consumer' | 'vendor',
  refreshToken: string,
  newRefreshToken: string,
) => {
  await dbClient
    .update(sessionTable)
    .set({
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }) // 30 days
    .where(and(eq(sessionTable.refreshToken, refreshToken), eq(sessionTable.role, role)));
};

export const getSessionByRefreshToken = async (
  role: 'consumer' | 'vendor',
  refreshToken: string,
) => {
  return await dbClient
    .select()
    .from(sessionTable)
    .where(and(eq(sessionTable.refreshToken, refreshToken), eq(sessionTable.role, role)))
    .limit(1)
    .then(result => result[0]);
};

export const deleteSessionByRefreshToken = async (
  role: 'consumer' | 'vendor',
  refreshToken: string,
) => {
  await dbClient
    .delete(sessionTable)
    .where(and(eq(sessionTable.refreshToken, refreshToken), eq(sessionTable.role, role)));
};
