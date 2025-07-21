import { Router } from 'express';

import * as consumerAuthController from '@/controllers/consumer.auth.controller';
import * as vendorAuthController from '@/controllers/vendors.auth.controller';

import { authMiddleware } from '@/middleware/auth.middleware';
import { refreshSession } from '@/controllers/session.controller';

const router = Router();

/**
 * For Consumers
 */
router.route('/register').post(consumerAuthController.registerConsumerCtrl);
router.route('/register/verify').post(consumerAuthController.verifyConsumerCtrl);
router.route('/register/resend-otp').post(consumerAuthController.resendVerificationOtpCtrl);

router.route('/login').post(consumerAuthController.loginConsumerCtrl);
router.route('/logout').post(authMiddleware, consumerAuthController.logoutConsumerCtrl);

// router.route('/forgot-password').post();
// router.route('/forgot-password/verify-otp').post();
// router.route('/reset-password').post();

/**
 * For Vendors
 */
router.route('/vendors/register').post(vendorAuthController.register);
router.route('/vendors/register/verify').post(vendorAuthController.registrationVerify);
router.route('/vendors/register/resend-otp').post(vendorAuthController.resendOtp);

router.route('/vendors/login').post(vendorAuthController.login);
router.route('/vendors/logout').post(authMiddleware, vendorAuthController.logout);

// router.route('/vendor/forgot-password').post();
// router.route('/vendor/forgot-password/verify-otp').post();
// router.route('/vendor/reset-password').post();

/**
 * For Session
 */
router.route('/refresh').post(refreshSession);

export { router as authRoutes };
