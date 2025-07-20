import { and, dbClient, eq } from '@marketly/drizzle';
import { hashPassword } from '@/utils/password.utils';
import { TConsumerRegistration } from '@marketly/lib/schemas/auth';
import { accountTable, consumerTable } from '@marketly/drizzle/db/schemas';

// create new consumer
const createNewConsumer = async (data: TConsumerRegistration) => {
  // create new account
  const hash = await hashPassword(data.password);

  const account = await dbClient
    .insert(accountTable)
    .values({
      email: data.email,
      role: 'consumer',
      password: hash,
    })
    .returning();

  // create new consumer
  const consumer = await dbClient
    .insert(consumerTable)
    .values({
      accountId: account[0].id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    })
    .returning();

  return account[0];
};

// mark consumer as verified
const markerConsumerAsVerified = async (email: string) => {
  await dbClient
    .update(accountTable)
    .set({ isVerified: true })
    .where(eq(accountTable.email, email));

  await dbClient
    .update(consumerTable)
    .set({ emailVerified: true })
    .where(eq(consumerTable.email, email));
};

// get consumer by email
const getConsumerByEmail = async (email: string) => {
  return await dbClient.query.consumerTable.findFirst({
    where: eq(consumerTable.email, email),
  });
};

// get consumer by id
const getConsumerById = async (id: number) => {
  return await dbClient.query.consumerTable.findFirst({
    where: eq(consumerTable.accountId, id),
  });
};

// get consumer with account
const getConsumerAccountByEmail = async (email: string) => {
  return await dbClient.query.accountTable.findFirst({
    where: and(eq(accountTable.email, email), eq(accountTable.role, 'consumer')),
  });
};

export {
  createNewConsumer,
  markerConsumerAsVerified,
  getConsumerByEmail,
  getConsumerById,
  getConsumerAccountByEmail,
};
