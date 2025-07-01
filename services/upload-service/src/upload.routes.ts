import express from 'express';
import { upload } from './multer.config';
import { deleteImage, multipleUpload, uploadSingleImage } from './upload.controller';

const router = express.Router();

router.route('/').post(upload.single('file'), uploadSingleImage);
router.route('/multiple').post(upload.array('files'), multipleUpload);
router.route('/').delete(deleteImage);

export { router as uploadRoutes };
