import { env } from '@marketly/config';
import Redis from 'ioredis';

export const redisClient = new Redis({
  host: env.REDIS_HOST ?? 'localhost',
  port: env.REDIS_PORT ?? 6379,
  password: env.REDIS_PASSWORD,
});
