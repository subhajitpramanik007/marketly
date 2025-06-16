import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { logger } from '@marketly/logger';

import { healthRoutes } from './healthcheck.routes';
import { authRoutes } from './auth.routes';

const router = Router();

router.use('/', authRoutes);
router.use('/health', healthRoutes);

try {
  const docs = require('../../../../docs/services/auth-swagger.json');
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
} catch {
  logger.warn("Docs not found, If you want to see them, run 'pnpm run swagger'");
}

export default router;
