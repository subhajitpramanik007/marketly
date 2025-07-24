import { dbClient, eq } from '@marketly/drizzle';
import { consumerTable, imageTable } from '@marketly/drizzle/db/schemas';

export const getConsumerByAccountId = async (id: number) => {
  const response = await dbClient
    .select()
    .from(consumerTable)
    .leftJoin(imageTable, eq(consumerTable.avatarId, imageTable.id))
    .where(eq(consumerTable.accountId, id));

  if (!response || response.length === 0) {
    return null;
  }

  return {
    ...response[0].consumers,
    avatar: response[0].images?.url,
  };
};
