import { refreshSession } from '@/controllers/session.controller';
import { Router } from 'express';

const router = Router();

router.route('/refresh').post(refreshSession);

export { router as sessionRoutes };
