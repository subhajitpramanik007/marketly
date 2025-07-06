import { logger } from '@marketly/logger';
import { env } from '@marketly/config';
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerUi from 'swagger-ui-express';

const router: Router = Router();

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

const proxyServers = [
  {
    service: 'Auth',
    route: '/api/auth',
    targetUrl: `${env.AUTH_SERVICE_URL}/api/auth`,
  },
  {
    service: 'Consumers',
    route: '/api/consumers',
    targetUrl: `${env.CONSUMER_SERVICE_URL}/api/consumers`,
  },
  {
    service: 'Vendors',
    route: '/api/vendors',
    targetUrl: `${env.VENDOR_SERVICE_URL}/api/vendors`,
  },
  {
    service: 'Admin',
    route: '/api/admin',
    targetUrl: `${env.ADMIN_SERVICE_URL}/api/admin`,
  },
  {
    service: 'Products',
    route: '/api/products',
    targetUrl: `${env.PRODUCT_SERVICE_URL}/api/products`,
  },
  {
    service: 'Uploads',
    route: '/api/uploads',
    targetUrl: `${env.UPLOAD_SERVICE_URL}/api/uploads`,
  },
];

proxyServers.forEach(({ service, route, targetUrl }) => {
  router.use(route, createProxyMiddleware({ target: targetUrl, changeOrigin: true }));
});

try {
  const baseDocs = require('../../../docs/base-swagger.json');
  router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(baseDocs));
} catch {
  logger.warn('No docs found, If you want to generate docs, run `pnpm run swagger`');
}

export default router;
