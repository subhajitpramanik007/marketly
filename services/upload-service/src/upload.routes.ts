import express from 'express';
import { upload } from './multer.config';
import { deleteImage, multipleUpload, uploadSingleImage } from './upload.controller';
import { authMiddleware } from '@marketly/http';

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(upload.single('file'), uploadSingleImage);
router.route('/multiple').post(upload.array('files'), multipleUpload);
router.route('/').delete(deleteImage);

export { router as uploadRoutes };
