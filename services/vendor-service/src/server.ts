import app from './app';
import { logger } from '@marketly/logger';
import { PORT } from './constants';

async function bootstrap() {
  try {
    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Vendors service at http://localhost:${PORT}`);
      logger.info(`Vendors service docs at http://localhost:${PORT}/api/vendors/docs`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
