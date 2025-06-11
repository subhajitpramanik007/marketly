import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { healthRoutes } from './heathcheck.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

export default router;
