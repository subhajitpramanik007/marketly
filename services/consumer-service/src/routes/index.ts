import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { authRoutes } from './auth.routes';
import { healthRoutes } from './heathcheck.routes';
import { logger } from '@marketly/logger';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

// Docs
try {
  const docs = require('../../../../docs/services/consumers-swagger.json');
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
} catch {
  logger.warn("Docs not found, If you want to see them, run 'pnpm run swagger'");
}

export default router;
