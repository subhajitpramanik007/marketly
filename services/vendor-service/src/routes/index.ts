import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { logger } from '@marketly/logger';

import { healthRoutes } from './heathcheck.routes';
import { profileRoutes } from './profile.routes';
import { staffsRoutes } from './staffs.routes';
import { onboardingRoutes } from './onboarding.routes';
import { meRoutes } from './me.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/onboarding', onboardingRoutes);
router.use('/me', meRoutes);
router.use('/:vendorId/profile', profileRoutes);
router.use('/:vendorId/staffs', staffsRoutes);

try {
  const docs = require('../../../../docs/services/vendors-swagger.json');
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
} catch {
  logger.warn("Docs not found, If you want to see them, run 'pnpm run swagger'");
}

export default router;
