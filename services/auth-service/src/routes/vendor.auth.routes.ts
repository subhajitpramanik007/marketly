import { Router } from 'express';
import * as vendorAuthController from '@/controllers/vendors.auth.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const router = Router();

router.route('/register').post(vendorAuthController.register);
router.route('/register/verify').post(vendorAuthController.registrationVerify);
router.route('/register/resend-otp').post(vendorAuthController.resendOtp);

// router.route('/forgot-password').post();
// router.route('/forgot-password/verify-otp').post();
// router.route('/reset-password').post();

router.route('/login').post(vendorAuthController.login);
router.route('/logout').post(authMiddleware, vendorAuthController.logout);

export { router as vendorAuthRoutes };
