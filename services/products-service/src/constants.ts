import { env } from '@marketly/config';

export const PORT = process.env.PORT ? Number(process.env.PORT) : env.PRODUCT_SERVICE_PORT;
