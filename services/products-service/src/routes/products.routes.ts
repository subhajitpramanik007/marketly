import { Router } from 'express';

import {
  addNewProduct,
  deleteProduct,
  getProduct,
  getProductDetails,
  getProducts,
  getVendorProducts,
  toggleProductStatus,
  updateProductDetails,
} from '@/controllers/products.controller';
import { authenticatedVendor } from '@/middlewares';

const router = Router();

// for public route
router.route('/').get(getProducts);

// required authentication for vendor route
router.route('/me').get(authenticatedVendor, getVendorProducts);

router.route('/:productSlug').get(getProduct);

// required authentication for vendor route

router.use(authenticatedVendor);

router.route('/').post(addNewProduct);
router.route('/:productSlug/details').get(getProductDetails);
router.route('/:productId').patch(updateProductDetails);
router.route('/:productId').delete(deleteProduct);
// is avalable or not
router.route('/:productId/toggle-status').patch(toggleProductStatus);

export { router as productRoutes };
