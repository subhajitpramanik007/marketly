import { Router } from 'express';

import {
  getVendorAllStaffs,
  createVendorStaff,
  getVendorStaff,
  updateVendorStaff,
  deleteVendorStaff,
  updateVendorStaffPermission,
} from '../controllers/staffs.controller';

import { authMiddleware } from '@marketly/auth/middleware';
import { vendorAuthMiddleware } from '../middleware';

import { zodValidationMiddleware, zodValidationQueryMiddleware } from '@marketly/http';

import {
  staffOfVendorParamsSchema,
  vendorParamsSchema,
  vendorStaffPerminissionSchema,
  vendorStaffSchema,
  vendorStaffUpdateSchema,
} from '@marketly/lib/schemas';

const router = Router();

router.use(authMiddleware, vendorAuthMiddleware, zodValidationQueryMiddleware(vendorParamsSchema));

router.route('/').get(
  /**
   * #swagger.tags = ['Vendors - Staffs']
   * #swagger.summary = 'Vendor staffs list by vendor id, only admin can access'
   * #swagger.responses[200] = { description: 'Vendor staffs' }
   */
  getVendorAllStaffs,
);

router.route('/').post(
  zodValidationMiddleware(vendorStaffSchema),
  /**
   * #swagger.tags = ['Vendors - Staffs']
   * #swagger.summary = 'Create vendor staff by vendor id, only admin can access'
   * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor staff details',
        required: true,
        schema: {
          firstName: 'Owner Name',
          lastName: 'Owner Last Name',
          email: 'rahul@example.com',
          phone: '1234567890',
          password: 'SecurePassword123',
        }
      }
     * #swagger.responses[200] = { description: 'Vendor staff created successfully' }
     */
  createVendorStaff,
);

router.route('/:staffId').get(
  zodValidationQueryMiddleware(staffOfVendorParamsSchema),
  /**
   * #swagger.tags = ['Vendors - Staffs']
   * #swagger.summary = 'Vendor staff by staff id, only admin can access'
   * #swagger.responses[200] = { description: 'Vendor staff' }
   */
  getVendorStaff,
);

router.route('/:staffId').patch(
  zodValidationQueryMiddleware(staffOfVendorParamsSchema),
  zodValidationMiddleware(vendorStaffUpdateSchema),
  /**
   * #swagger.tags = ['Vendors - Staffs']
   * #swagger.summary = 'Update vendor staff by staff id, only admin can access'
   * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor staff details',
        required: true,
        schema: {
          firstName: 'Owner Name',
          lastName: 'Owner Last Name',
          email: 'rahul@example.com',
          phone: '1234567890',
        }
      }
     * #swagger.responses[200] = { description: 'Vendor staff updated successfully' }
     */
  updateVendorStaff,
);

router.route('/:staffId').delete(
  zodValidationQueryMiddleware(staffOfVendorParamsSchema),
  /**
   * #swagger.tags = ['Vendors - Staffs']
   * #swagger.summary = 'Delete vendor staff by staff id, only admin can access'
   * #swagger.responses[200] = { description: 'Vendor staff deleted successfully' }
   */
  deleteVendorStaff,
);

router.route('/:staffId/permission').patch(
  zodValidationQueryMiddleware(staffOfVendorParamsSchema),
  zodValidationMiddleware(vendorStaffPerminissionSchema),
  /**
   * #swagger.tags = ['Vendors - Staffs']
   * #swagger.summary = 'Update vendor staff permissions by staff id, only admin can access'
   * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor staff permissions',
        required: true,
        schema: {
          permission: "Update permission"
        }
      }
     * #swagger.responses[200] = { description: 'Vendor staff permissions updated successfully' }
     */
  updateVendorStaffPermission,
);

export { router as staffsRoutes };
