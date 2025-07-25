import { Router } from 'express';

import * as wishlistCtrl from '@/controllers/wishlist.controller';
import { isAuthenticated } from '@/middlewares/isAuthenticated';

const router = Router();

router.use(isAuthenticated);

router.route('/').get(wishlistCtrl.getWishlists); // get all product of wishlist
router.route('/:productId').post(wishlistCtrl.toggleWishlist); // for toggle

export default router;
