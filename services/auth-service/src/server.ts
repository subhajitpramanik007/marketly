import app from './app';
import { logger } from '@marketly/logger';
import { PORT } from './constants';

async function bootstrap() {
  try {
    app.listen(PORT, () => {
      logger.info(`Auth service at http://localhost:${PORT}`);
      logger.info(`Auth service docs at http://localhost:${PORT}/api/auth/docs`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
