import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { logger } from '@marketly/logger';

import { healthRoutes } from './heathcheck.routes';
import { meRoutes } from './me.routes';
import wishlistRoutes from './wishlist.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/me', meRoutes);
router.use('/wishlists', wishlistRoutes);

// Docs
try {
  const docs = require('../../../../docs/services/consumers-swagger.json');
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
} catch {
  logger.warn("Docs not found, If you want to see them, run 'pnpm run swagger'");
}

export default router;
