import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { logger } from '@marketly/logger';

import { healthRoutes } from './heathcheck.routes';

const router = Router();

router.use('/health', healthRoutes);

// Docs
try {
  const docs = require('../../../../docs/services/products-swagger.json');
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
} catch {
  logger.warn("Docs not found, If you want to see them, run 'pnpm run swagger'");
}

export default router;
