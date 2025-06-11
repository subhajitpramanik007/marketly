import { logger } from '@marketly/logger';
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { PORT } from './constants';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Welcome to Marketly API Gateway',
  });
});

router.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API Gateway is healthy',
  });
});

const proxyServers = [
  {
    service: 'Consumers',
    route: '/api/consumers',
    targetUrl: 'http://localhost:6001/api/consumers',
  },
  {
    service: 'Products',
    route: '/api/products',
    targetUrl: 'http://localhost:6002/api/products',
  },
];

proxyServers.forEach(({ service, route, targetUrl }) => {
  router.use(route, createProxyMiddleware({ target: targetUrl, changeOrigin: true }));

  logger.info(`${service} service health at http://localhost:${PORT}${route}/health`);
});

export default router;
