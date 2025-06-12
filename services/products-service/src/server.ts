import { logger } from '@marketly/logger';
import app from './app';
import { PORT } from './constants';

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
