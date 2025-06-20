import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

import { drizzle } from 'drizzle-orm/node-postgres';
import * as schemas from './db/schemas';

import { Pool } from 'pg';

export const db = new Pool({ connectionString: process.env.DATABASE_URL });

export const dbClient = drizzle(db, {
  schema: {
    ...schemas,
  },
});

export * from 'drizzle-orm';
