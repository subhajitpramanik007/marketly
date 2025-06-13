import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { logger } from '@marketly/logger';

import { healthRoutes } from './heathcheck.routes';
import { authRoutes } from './auth.routes';
import { profileRoutes } from './profile.routes';
import { staffsRoutes } from './staffs.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/:vendorId/profile', profileRoutes);
router.use('/:vendorId/staffs', staffsRoutes);

try {
  const docs = require('../../../../docs/services/vendors-swagger.json');
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
} catch {
  logger.warn("Docs not found, If you want to see them, run 'pnpm run swagger'");
}

export default router;
