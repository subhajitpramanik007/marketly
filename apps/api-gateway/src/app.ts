import express, { Request } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { env } from '@marketly/config';
import { logger } from '@marketly/logger';
import router from './routes';
import { PORT } from './constants';

import { errorMiddleware, notFoundMiddleware } from '@marketly/http';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(morgan('dev'));
// app.use(express.json({ limit: '64kb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());

app.set('trust proxy', 1);

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: any) => (req.user || req.currentUser ? 1000 : 100),
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => req.ip,
});

app.use(rateLimiter);

app.use(router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

async function bootstrap() {
  try {
    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`API Gateway at http://localhost:${PORT}`);
      logger.info(`API Gateway docs at http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
