import pino from 'pino';
import { env } from '@marketly/config';

const isDev = env.NODE_ENV === 'development';

export const logger = pino({
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: 'SYS:standard',
        },
      }
    : undefined,
});
