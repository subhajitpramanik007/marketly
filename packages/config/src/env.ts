import path from 'path';
import { config as loadEnv } from 'dotenv';
import { envSchema } from './env.schema';

loadEnv({ path: path.resolve(__dirname, '../../../.env') });

try {
  loadEnv({ path: path.resolve(process.cwd(), '.env') });
} catch {}

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

export const isDev = env.NODE_ENV === 'development';
