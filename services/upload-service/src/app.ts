import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from '@marketly/config';
import { uploadRoutes } from './upload.routes';
import { errorMiddleware, notFoundMiddleware } from '@marketly/http';

const app = express();

// For uploads
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

app.use(cookieParser());

app.use('/api/uploads', uploadRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT ? Number(process.env.PORT) : env.UPLOAD_SERVICE_PORT;

async function bootstrap() {
  try {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Upload service at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
