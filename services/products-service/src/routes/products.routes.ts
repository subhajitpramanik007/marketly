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

import {
  addOrUpdateProductImageIds,
  updateProductImageOrder,
  setProductPrimaryImage,
  deleteSingleImageOfProduct,
  deleteAllProductImages,
} from '@/controllers/products.image.controller';

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

// products images routes
router.route('/:productId/images').post(addOrUpdateProductImageIds); // add image ids to product image table
router.route('/:productId/images').patch(addOrUpdateProductImageIds); // add image ids to product image table
router.route('/:productId/images/:imgId/is-primary').post(setProductPrimaryImage); // add image as primary
router.route('/:productId/images/:imgId/order/:order').patch(updateProductImageOrder); // change image order
router.route('/:productId/images/:imgId').delete(deleteSingleImageOfProduct); // delete a image of product
router.route('/:productId/images').delete(deleteAllProductImages); // delete all images of product

export { router as productRoutes };
