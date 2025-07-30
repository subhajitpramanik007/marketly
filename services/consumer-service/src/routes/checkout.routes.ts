import { Router } from 'express';
import { isAuthenticated } from '@/middlewares/isAuthenticated';

import * as checkoutCtrl from '@/controllers/checkout.controller';

export const router = Router();

router.route('/webhook').post(checkoutCtrl.handleCheckoutWebhook);

router.use(isAuthenticated);

router.route('/summary').post(checkoutCtrl.getCheckoutSummary);
router.route('/process-payment').post(checkoutCtrl.processCheckoutPayment);
router.route('/verify-payment').post(checkoutCtrl.verifyPayment);
// router.route('/cancel').post(checkoutCtrl.cancelCheckoutSession);

export default router;
