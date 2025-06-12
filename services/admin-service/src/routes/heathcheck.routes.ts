import { Router } from 'express';

const router = Router();

router.get(
  '/',
  /**
   * #swagger.tags = ['Admin - Healthcheck']
   * #swagger.summary = 'Healthcheck'
   * #swagger.responses[200] = { description: 'Admin service is healthy' }
   */
  async (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'Admin service is healthy',
    });
  },
);

export { router as healthRoutes };
