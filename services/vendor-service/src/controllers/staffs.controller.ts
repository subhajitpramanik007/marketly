import { ApiResponse, asyncHandler, BadRequestError, UnauthorizedError } from '@marketly/http';
import { TCreateVendorStaff, TUpdateVendorStaff } from '@marketly/lib/schemas';

/**
 * Vendor staffs list by vendor id, only admin or manager can access
 * - only admin or manager can access
 * - then return staffs
 */
export const getVendorAllStaffs = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Staffs fetched successfully'));
});

/**
 * Create vendor staff
 * - Only admin or manager can access
 * - validate user input-{firstName, lastName?, email, password}
 */
export const createVendorStaff = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Staff created successfully'));
});

/**
 * Get vendor staff
 * - Only admin or manager can access
 * - then return staff
 */
export const getVendorStaff = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Vendor staff fetched successfully'));
});

/**
 * Update vendor staff
 * - Only admin or manager can access
 * - validate user input-{firstName, lastName?, email, password}
 * - then update staff
 * - then return staff
 * */
export const updateVendorStaff = asyncHandler(async (req, res) => {
  // check if user is admin or manager
  res.status(200).json(new ApiResponse(200, {}, 'Vendor staff updated successfully'));
});

/**
 * Delete vendor staff
 * - Only admin or manager can access
 * - then delete staff
 */
export const deleteVendorStaff = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Vendor staff deleted successfully'));
});

/**
 * Update vendor staff permission
 * - Only admin or manager can access
 * - then update staff permission
 * - then return staff permission
 */
export const updateVendorStaffPermission = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Vendor staff permission updated successfully'));
});
