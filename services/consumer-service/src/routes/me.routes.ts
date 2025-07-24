import { getMeCtrl } from '@/controllers/me.controller';
import { authMiddleware } from '@marketly/http';
import { Router } from 'express';

const router = Router();

router.use(authMiddleware);

router.route('/').get(getMeCtrl);

export { router as meRoutes };
