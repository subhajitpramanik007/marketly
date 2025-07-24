import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { healthRoutes } from './heathcheck.routes';
import { logger } from '@marketly/logger';
import { meRoutes } from './me.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/me', meRoutes);
// Docs
try {
  const docs = require('../../../../docs/services/consumers-swagger.json');
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
} catch {
  logger.warn("Docs not found, If you want to see them, run 'pnpm run swagger'");
}

export default router;
