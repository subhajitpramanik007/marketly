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
import { healthRoutes } from './routes/heathcheck.routes';
import { profileRoutes } from './routes/profile.routes';
import { staffsRoutes } from './routes/staffs.routes';
import { onboardingRoutes } from './routes/onboarding.routes';
import { meRoutes } from './routes/me.routes';

app.use('/api/vendors/health', healthRoutes);
app.use('/api/vendors/onboarding', onboardingRoutes);
app.use('/api/vendors/me', meRoutes);
app.use('/api/vendors/:storeId/profile', profileRoutes);
app.use('/api/vendors', staffsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
