import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
import { healthRoutes } from './routes/healthcheck.routes.js';
import { vendorAuthRoutes } from './routes/vendor.auth.routes.js';
import { sessionRoutes } from './routes/session.routes.js';
import { consumerAuthRoutes } from './routes/comsumer.auth.routes.js';

app.use('/api/auth/health', healthRoutes);
app.use('/api/auth', consumerAuthRoutes);
app.use('/api/auth/vendors', vendorAuthRoutes);
app.use('/api/auth/sessions', sessionRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
