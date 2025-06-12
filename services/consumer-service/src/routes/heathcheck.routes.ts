import { Router } from 'express';

const router = Router();

router.get(
  '/',
  /**
   * #swagger.tags = ['Consumers - Healthcheck']
   * #swagger.summary = 'Consumer healthcheck'
   * #swagger.responses[200] = { description: 'Consumer service is healthy' }
   */
  async (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'Consumer service is healthy',
    });
  },
);

export { router as healthRoutes };
