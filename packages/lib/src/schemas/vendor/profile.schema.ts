import z from 'zod';
import { zodString } from '../utils.schema';

export const vendorStoreUpdateSchema = z.object({
  storeName: z.string().optional(),
});
