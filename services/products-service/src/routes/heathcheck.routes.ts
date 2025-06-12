import { Router } from 'express';

const router = Router();

router.get(
  '/',
  /**
   * #swagger.tags = ['Products - Healthcheck']
   * #swagger.summary = 'Products Healthcheck'
   * #swagger.responses[200] = { description: 'Products service is healthy' }
   */
  async (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'Products service is healthy',
    });
  },
);

export { router as healthRoutes };
