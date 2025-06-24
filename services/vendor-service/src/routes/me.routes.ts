import { Router } from 'express';
import { authMiddleware } from '@marketly/http';

import { vendorAuthMiddleware } from '@/middleware';
import { getCurrentVendorData } from '@/controllers/me.controller';

const router = Router();

router.use(authMiddleware, vendorAuthMiddleware);

router.route('/').get(getCurrentVendorData);

export { router as meRoutes };
