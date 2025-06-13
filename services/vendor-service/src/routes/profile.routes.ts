import { Router } from 'express';

import {
  getVendorProfile,
  updateVendorProfile,
  updateVendorLogo,
  updateVendorCover,
  deleteVendorAccount,
} from '../controllers/profile.controller.js';
import { zodValidationMiddleware } from '@marketly/http';
import { vendorChangePasswordSchema } from '@marketly/lib/schemas';

const router = Router();

router.route('/').get(
  /**
   * #swagger.tags = ['Vendors - Profile']
   * #swagger.summary = 'Vendor profile'
   * #swagger.responses[200] = { description: 'Vendor profile' }
   */
  getVendorProfile,
);

router.route('/').patch(
  /**
   * #swagger.tags = ['Vendors - Profile']
   * #swagger.summary = 'Update vendor profile'
   * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor profile details',
        required: true,
        schema: {
          storeName: 'Store Name',
          firstName: 'Owner Name',
          lastName: 'Owner Last Name',
        }
      }
     * #swagger.responses[200] = { description: 'Vendor profile updated successfully' }
     */
  updateVendorProfile,
);

router.route('/').delete(
  /**
   * #swagger.tags = ['Vendors - Profile']
   * #swagger.summary = 'Delete vendor profile'
   * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor account details',
        required: true,
        schema: {
          storeName: 'store name',
          password: 'SecurePassword123',
        }
      }
   * #swagger.responses[200] = { description: 'Vendor profile deleted successfully' }
   */
  deleteVendorAccount,
);

router.route('/logo').patch(
  /**
   * #swagger.tags = ['Vendors - Profile']
   * #swagger.summary = 'Update vendor logo'
   * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor logo details',
        required: true,
        schema: {
          image: 'image data'
        }
    }   
     * #swagger.responses[200] = { description: 'Vendor logo updated successfully' }
     */
  updateVendorLogo,
);

router.route('/banner').patch(
  /**
   * #swagger.tags = ['Vendors - Profile']
   * #swagger.summary = 'Update vendor banner'
   * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor banner details',
        required: true,
        schema: {
          image: 'image data'
        }
    }       
     * #swagger.responses[200] = { description: 'Vendor banner updated successfully' }
     */
  updateVendorCover,
);

export { router as profileRoutes };
