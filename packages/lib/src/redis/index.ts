import { env } from '@marketly/config';
import Redis from 'ioredis';

const redisClient = new Redis({
  host: env.REDIS_HOST ?? 'localhost',
  port: env.REDIS_PORT ?? 6379,
  password: env.REDIS_PASSWORD,
  maxLoadingRetryTime: 1000,
  maxRetriesPerRequest: 5,
  lazyConnect: true,
});

redisClient.on('error', error => {
  console.log('Error connecting to Redis', error);
});

redisClient.connect().catch(error => {
  console.log('Error connecting to Redis', error);
});

export { redisClient };
