import { logger } from '@marketly/logger';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    logger.info('ok');
    cb(null, './tmp/uploads/');
  },
  filename: function (_req, file, cb) {
    logger.info('File name ok');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
