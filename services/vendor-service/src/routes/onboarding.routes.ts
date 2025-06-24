import { Router } from 'express';
import {
  addressOnboarding,
  checkStoreNameAvailability,
  vendorOnboardingStatus,
  vendorStoreOnboarding,
} from '@/controllers/onboarding.controller';
import { authMiddleware } from '@marketly/http';
import { vendorAuthMiddleware } from '@/middleware';

const router = Router();

router.use(authMiddleware, vendorAuthMiddleware);

router.route('/').post(vendorStoreOnboarding);
router.route('/check-store-name').post(checkStoreNameAvailability);
router.route('/:vendorId/address').post(addressOnboarding);
router.route('/status').get(vendorOnboardingStatus);

export { router as onboardingRoutes };
