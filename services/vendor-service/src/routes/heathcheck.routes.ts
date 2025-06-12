import { Router } from 'express';

const router = Router();

router.get(
  '/',
  /**
   * #swagger.tags = ['Vendor - Healthcheck']
   * #swagger.summary = 'Vendor Healthcheck'
   * #swagger.responses[200] = { description: 'Vendor service is healthy' }
   */
  async (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'Vendor service is healthy',
    });
  },
);

export { router as healthRoutes };
