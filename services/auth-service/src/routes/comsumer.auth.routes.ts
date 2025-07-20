import { Router } from 'express';

import * as ctrl from '@/controllers/consumer.auth.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const router = Router();

router.route('/register').post(ctrl.registerConsumerCtrl);
router.route('/register/verify').post(ctrl.verifyConsumerCtrl);
router.route('/register/resend-otp').post(ctrl.resendVerificationOtpCtrl);

router.route('/login').post(ctrl.loginConsumerCtrl);
router.route('/logout').post(authMiddleware, ctrl.logoutConsumerCtrl);

router.route('/forgot-password').post();
router.route('/forgot-password/verify-otp').post();
router.route('/reset-password').post();

export { router as consumerAuthRoutes };
