import { Router } from 'express';

import * as orderCtrl from '@/controllers/order.controller';
import { isAuthenticated } from '@/middlewares/isAuthenticated';

const router = Router();

router.use(isAuthenticated);

router.route('/').get(orderCtrl.getOrders); // get all orders
router.route('/:orderId').get(orderCtrl.getOrderById); // get specific order
router.route('/:orderId/cancel').post(orderCtrl.cancelOrder); // cancel order

export default router;
