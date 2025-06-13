import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from '@marketly/config';
import { errorMiddleware, notFoundMiddleware } from '@marketly/http';

declare global {
  namespace Express {
    interface Request {
      user: any;
      currentUser: any;
      role: 'consumer' | 'vendor';
    }
  }
}

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());

// Routes
import router from './routes';

app.use('/api/vendors', router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
