import { logger } from '@marketly/logger';
import app from './app';

const PORT = process.env.PORT || 6002;

async function bootstrap() {
  try {
    app.listen(PORT, () => {
      logger.info(`Products service at http://localhost:${PORT}`);
      logger.info(`Products service at http://localhost:${PORT}/api/products/health`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
