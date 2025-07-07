import { Router } from 'express';

import {
  getVendorAllStaffs,
  createVendorStaff,
  getVendorStaff,
  updateVendorStaff,
  deleteVendorStaff,
  updateVendorStaffPermission,
} from '@/controllers/staffs.controller';

import { canManageVendorStore, vendorAuthMiddleware } from '@/middleware';

import {
  authMiddleware,
  zodValidationMiddleware,
  zodValidationQueryMiddleware,
} from '@marketly/http';

import {
  createStaffSchema,
  updateStaffSchema,
  vendorStaffPerminissionSchema,
} from '@/schemas/staffs.schema';
import { vendorStaffParamsSchema, vendorStoreParamsSchema } from '@/schemas/params.schema';

const router = Router();

// Check if user is authenticated
router.use(authMiddleware);

// Check user is vendor
router.use(vendorAuthMiddleware);

// Check if store id is valid
router.use(zodValidationQueryMiddleware(vendorStoreParamsSchema));

router.route('/:storeId/staffs').get(
  /**
   * #swagger.tags = ['Vendors - Staffs']
   * #swagger.summary = 'Vendor staffs list by vendor id, only admin can access'
   * #swagger.responses[200] = { description: 'Vendor staffs' }
   */
  getVendorAllStaffs,
);

router.route('/:storeId/staffs').post(
  zodValidationMiddleware(createStaffSchema),
  canManageVendorStore,
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

router
  .route('/:storeId/staffs/:staffId')
  .get(
    zodValidationQueryMiddleware(vendorStaffParamsSchema),
    /**
     * #swagger.tags = ['Vendors - Staffs']
     * #swagger.summary = 'Vendor staff by staff id, only admin can access'
     * #swagger.responses[200] = { description: 'Vendor staff' }
     */
    getVendorStaff,
  )
  .patch(
    canManageVendorStore,
    zodValidationQueryMiddleware(vendorStaffParamsSchema),
    zodValidationMiddleware(updateStaffSchema),
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
  )
  .delete(
    canManageVendorStore,
    zodValidationQueryMiddleware(vendorStaffParamsSchema),
    /**
     * #swagger.tags = ['Vendors - Staffs']
     * #swagger.summary = 'Delete vendor staff by staff id, only admin can access'
     * #swagger.responses[200] = { description: 'Vendor staff deleted successfully' }
     */
    deleteVendorStaff,
  );

router.route('/:storeId/staffs/:staffId/permission').patch(
  canManageVendorStore,
  zodValidationQueryMiddleware(vendorStaffParamsSchema),
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
