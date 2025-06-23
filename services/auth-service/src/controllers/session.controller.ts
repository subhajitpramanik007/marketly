import { REFRESH_TOKEN_NAMESPACE } from '@/constants/tokens.constants';
import { setAuthCookies } from '@/utils/cookies.utils';
import { JwtPayload, signInJwtToken } from '@/utils/jwt.utils';
import { dbClient, eq } from '@marketly/drizzle';
import { accountTable, sessionTable } from '@marketly/drizzle/db/schemas';
import { ApiResponse, asyncHandler } from '@marketly/http';

export const refreshSession = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_NAMESPACE];
  if (!refreshToken) throw new Error('Refresh token not found');

  const refreshTokenData = await dbClient.query.sessionTable.findFirst({
    where: eq(sessionTable.refreshToken, refreshToken),
  });

  if (!refreshTokenData) throw new Error('Refresh token not found');

  const account = await dbClient.query.accountTable.findFirst({
    where: eq(accountTable.id, refreshTokenData.accountId),
  });

  if (!account) throw new Error('Account not found');

  const jwtPayload: JwtPayload = {
    email: account.email,
    id: account.id.toString(),
  };

  const accessToken = await signInJwtToken(jwtPayload, account.role);
  const newRefreshToken = await signInJwtToken(jwtPayload, account.role, 'refresh');

  await dbClient
    .update(sessionTable)
    .set({
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })
    .where(eq(sessionTable.id, refreshTokenData.id));

  await setAuthCookies(res, accessToken, newRefreshToken, account.role);

  res.status(200).json(new ApiResponse(200, { accessToken }, 'Refresh successful'));
});
