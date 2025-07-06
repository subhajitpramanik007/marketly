import { env } from '@marketly/config';

export const PORT = process.env.PORT ? Number(process.env.PORT) : env.VENDOR_SERVICE_PORT;
