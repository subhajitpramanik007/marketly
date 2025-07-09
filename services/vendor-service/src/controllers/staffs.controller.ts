import {
  ApiError,
  ApiResponse,
  asyncHandler,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '@marketly/http';
import {
  TCreateVendorStaff,
  TUpdateVendorStaff,
  TVendorStaffPermission,
} from '@/schemas/staffs.schema';
import {
  changeVendorStaffPermission,
  createNewVendorStaff,
  getAllVendorStaffs,
  getVendorStaffCompleteData,
  getVendorStaffData,
  updateVendorStaffData,
} from '@/services/vendor-staff.service';
import { VendorAndStaffParams, VendorStoreParams } from '@/schemas/params.schema';
import { logger } from '@marketly/logger';

/**
 * Vendor staffs list by vendor id, only admin or manager can access
 * - only admin or manager can access
 * - then return staffs
 */
export const getVendorAllStaffs = asyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params as unknown as VendorStoreParams;

    const staffs = await getAllVendorStaffs(storeId);

    res.status(200).json(new ApiResponse(200, { staffs }, 'Vendor staffs fetched successfully'));
  } catch (error) {
    logger.error(error, 'Failed to fetch vendor staffs');
    if (error instanceof ApiError) throw error;
    throw new InternalServerError('Failed to fetch vendor staffs');
  }
});

/**
 * Create vendor staff
 * - Only admin or manager can access
 * - validate user input-{firstName, lastName?, email, password}
 */
export const createVendorStaff = asyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params as unknown as VendorStoreParams;

    const data = req.body as TCreateVendorStaff;

    const newVendorStaff = await createNewVendorStaff(storeId, req.user.id, data);

    res.status(200).json(new ApiResponse(200, { newVendorStaff }, 'Staff created successfully'));
  } catch (error) {
    logger.error(error, 'Failed to create vendor staff');
    if (error instanceof ApiError) throw error;
    throw new InternalServerError('Failed to create vendor staff');
  }
});

/**
 * Get vendor staff
 * - Only admin or manager can access
 * - then return staff
 */
export const getVendorStaff = asyncHandler(async (req, res) => {
  try {
    const { staffId, storeId } = req.params as unknown as VendorAndStaffParams;

    const staffData = await getVendorStaffCompleteData(storeId, staffId);

    res
      .status(200)
      .json(new ApiResponse(200, { staff: staffData }, 'Vendor staff fetched successfully'));
  } catch (error) {
    logger.error(error, 'Failed to fetch vendor staff');
    if (error instanceof ApiError) throw error;
    throw new InternalServerError('Failed to fetch vendor staff');
  }
});

/**
 * Update vendor staff
 * - Only admin or manager can access
 * - validate user input-{firstName, lastName?, email, password}
 * - then update staff
 * - then return staff
 * */
export const updateVendorStaff = asyncHandler(async (req, res) => {
  try {
    const { staffId, storeId } = req.params as unknown as VendorAndStaffParams;

    const data = req.body as TUpdateVendorStaff;

    const staffData = await getVendorStaffData(storeId, staffId);

    if (
      (staffData.role === 'owner' || staffData.role === 'manager') &&
      req.vendorStaff?.role !== 'owner'
    ) {
      throw new UnauthorizedError('Access denied');
    }

    const updatedVendorStaff = await updateVendorStaffData(storeId, staffData.id, data);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          staff: {
            ...staffData,
            ...updatedVendorStaff,
          },
        },
        'Vendor staff updated successfully',
      ),
    );
  } catch (error) {
    logger.error(error, 'Failed to update vendor staff');
    if (error instanceof ApiError) throw error;
    throw new InternalServerError('Failed to update vendor staff');
  }
});

/**
 * Delete vendor staff
 * - Only admin or manager can access
 * - then delete staff
 */
export const deleteVendorStaff = asyncHandler(async (req, res) => {
  try {
    const { staffId, storeId } = req.params as unknown as VendorAndStaffParams;

    const staffData = await getVendorStaffData(storeId, staffId);

    if (
      (staffData.role === 'owner' || staffData.role === 'manager') &&
      req.vendorStaff?.role !== 'owner'
    ) {
      throw new UnauthorizedError('Access denied');
    }

    res.status(200).json(new ApiResponse(200, {}, 'Vendor staff deleted successfully'));
  } catch (error) {
    logger.error(error, 'Failed to delete vendor staff');
    if (error instanceof ApiError) throw error;
    throw new InternalServerError('Failed to delete vendor staff');
  }
});

/**
 * Update vendor staff permission
 * - Only admin or manager can access
 * - then update staff permission
 * - then return staff permission
 */
export const updateVendorStaffPermission = asyncHandler(async (req, res) => {
  try {
    const { staffId, storeId } = req.params as unknown as VendorAndStaffParams;

    const data = req.body as TVendorStaffPermission;

    const staffData = await getVendorStaffData(storeId, staffId);

    if (
      (staffData.role === 'owner' || staffData.role === 'manager') &&
      req.vendorStaff?.role !== 'owner'
    ) {
      throw new UnauthorizedError('Access denied');
    }

    await changeVendorStaffPermission(storeId, staffData.id, staffData.role, data.permission);

    res.status(200).json(new ApiResponse(200, {}, 'Vendor staff permission updated successfully'));
  } catch (error) {
    logger.error(error, 'Failed to update vendor staff permission');
    if (error instanceof ApiError) throw error;
    throw new InternalServerError('Failed to update vendor staff permission');
  }
});
