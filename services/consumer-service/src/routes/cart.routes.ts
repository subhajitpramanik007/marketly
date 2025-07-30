import { Router } from 'express';

import * as cartCtrl from '@/controllers/cart.controller';
import { isAuthenticated } from '@/middlewares/isAuthenticated';

const router = Router();

router.use(isAuthenticated);

router.route('/').get(cartCtrl.getCartItems); // get all cart items
router.route('/').post(cartCtrl.addToCart); // add product to cart
router.route('/count').get(cartCtrl.getCartItemCount); // get cart item count
router.route('/clear').delete(cartCtrl.clearCart); // clear entire cart
router.route('/:cartItemId').put(cartCtrl.updateCartItemQuantity); // update cart item quantity
router.route('/:cartItemId').delete(cartCtrl.removeFromCart); // remove item from cart

export default router;
