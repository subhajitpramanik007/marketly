import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { env } from '@marketly/config';

import { errorMiddleware, notFoundMiddleware } from '@marketly/http';

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

app.use('/api/consumers', router);

// Error handlers
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
