import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),

  // Ports
  API_GATEWAY_PORT: z.string().default('8080').transform(Number),
  AUTH_SERVICE_PORT: z.string().default('5999').transform(Number),
  CONSUMER_SERVICE_PORT: z.string().default('6001').transform(Number),
  VENDOR_SERVICE_PORT: z.string().default('6002').transform(Number),
  ADMIN_SERVICE_PORT: z.string().default('6003').transform(Number),
  PRODUCT_SERVICE_PORT: z.string().default('6004').transform(Number),
  ORDER_SERVICE_PORT: z.string().default('6005').transform(Number),
  UPLOAD_SERVICE_PORT: z.string().default('7000').transform(Number),

  // Services
  API_GATEWAY_URL: z.string().url().default('http://localhost:8080'),
  AUTH_SERVICE_URL: z.string().url().default('http://localhost:5999'),
  CONSUMER_SERVICE_URL: z.string().url().default('http://localhost:6001'),
  VENDOR_SERVICE_URL: z.string().url().default('http://localhost:6002'),
  ADMIN_SERVICE_URL: z.string().url().default('http://localhost:6003'),
  PRODUCT_SERVICE_URL: z.string().url().default('http://localhost:6004'),
  ORDER_SERVICE_URL: z.string().url().default('http://localhost:6005'),
  UPLOAD_SERVICE_URL: z.string().url().default('http://localhost:7000'),

  // Cors origin string -> array
  CORS_ORIGIN: z
    .string()
    .transform(s => s.split(','))
    .default('http://localhost:3000'),

  // Auth
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_SECRET: z.string().min(10),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),

  // Redis
  REDIS_URL: z.string().url(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
  REDIS_PASSWORD: z.string(),

  // SMTP
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_SERVICE: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM: z.string(),

  //   Service
  API_URL: z.string().url().default('http://localhost:8080'),
  CLIENT_URL: z.string().url().default('http://localhost:3000'),

  //   Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_FOLDER: z.string().default('marketly'),
});
