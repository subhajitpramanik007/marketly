import { Router } from 'express';

const router = Router();

router.get(
  '/',
  /**
   * #swagger.tags = ['Auth - Healthcheck']
   * #swagger.summary = 'Auth Healthcheck'
   * #swagger.responses[200] = { description: 'Auth service is healthy' }
   */
  async (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'Auth service is healthy',
    });
  },
);

export { router as healthRoutes };
