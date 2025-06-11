import { Router } from 'express';

const router = Router();

router.get(
  '/',
  /**
   * #swagger.tags = ['Healthcheck']
   * #swagger.summary = 'Healthcheck'
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
