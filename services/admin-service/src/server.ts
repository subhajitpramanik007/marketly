import app from './app';
import { logger } from '@marketly/logger';
import { PORT } from './constants';

async function bootStrap() {
  try {
    app.listen(PORT, () => {
      logger.info(`Admin service at http://localhost:${PORT}`);
      logger.info(`Admin service docs at http://localhost:${PORT}/api/admin/docs`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootStrap();
