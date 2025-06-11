import { logger } from '@marketly/logger';
import app from './app';

const PORT = process.env.PORT || 6001;

async function bootstrap() {
  try {
    app.listen(PORT, () => {
      logger.info(`Consumers service at http://localhost:${PORT}`);
      logger.info(`Consumers service at http://localhost:${PORT}/api/consumers/health`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
