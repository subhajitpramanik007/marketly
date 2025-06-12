import { logger } from '@marketly/logger';
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerUi from 'swagger-ui-express';

const router = Router();

router.get(
  '/',
  /**
   * #swagger.tags = ['ApiGateway - Welcome']
   *  #swagger.summary = 'Welcome'
   *  #swagger.description = 'Welcome to Marketly API Gateway'
   *  #swagger.responses[200] = { description: 'Welcome to Marketly API Gateway' }
   * */
  (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'Welcome to Marketly API Gateway',
    });
  },
);

router.get(
  '/api/health',
  /**
   * #swagger.tags = ['ApiGateway - Healthcheck']
   * #swagger.summary = 'Healthcheck'
   * #swagger.description = 'Healthcheck'
   * #swagger.responses[200] = { description: 'API Gateway is healthy' }
   * */
  (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'API Gateway is healthy',
    });
  },
);

try {
  const baseDocs = require('../../../docs/base-swagger.json');
  router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(baseDocs));
} catch {
  logger.warn('No docs found, If you want to generate docs, run `pnpm run swagger`');
}

const proxyServers = [
  {
    service: 'Consumers',
    route: '/api/consumers',
    targetUrl: 'http://localhost:6001/api/consumers',
  },
  {
    service: 'Vendors',
    route: '/api/vendors',
    targetUrl: 'http://localhost:6002/api/vendors',
  },
  {
    service: 'Admin',
    route: '/api/admin',
    targetUrl: 'http://localhost:6003/api/admin',
  },
  {
    service: 'Products',
    route: '/api/products',
    targetUrl: 'http://localhost:6004/api/products',
  },
];

proxyServers.forEach(({ service, route, targetUrl }) => {
  router.use(route, createProxyMiddleware({ target: targetUrl, changeOrigin: true }));
});

export default router;
