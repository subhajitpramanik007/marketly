import pino from 'pino';
import { env } from '@marketly/config';

const isProd = env.NODE_ENV === 'production';

let logger: pino.Logger;

if (isProd) {
  logger = pino();
} else {
  const pretty = require('pino-pretty');
  logger = pino(
    pretty({
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname',
    }),
  );
}

export { logger };

// export const logger = pino({
//   transport: isDev
//     ? {
//         target: 'pino-pretty',
//         options: {
//           colorize: true,
//           levelFirst: true,
//           translateTime: 'SYS:standard',
//         },
//       }
//     : undefined,
// });
