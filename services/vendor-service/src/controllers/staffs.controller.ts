import { ApiResponse, asyncHandler, BadRequestError, UnauthorizedError } from '@marketly/http';
import {
  getAllStaffsOfVendor,
  getCurrentVendorAdminOrManager,
  getCurrentVendorStaff,
} from '../services/staffs.service';
import { TCreateVendorStaff, TUpdateVendorStaff } from '@marketly/lib/schemas';
import { prismaClient } from '@marketly/db';
import { hashPassword } from '@marketly/auth/password';

/**
 * Vendor staffs list by vendor id, only admin or manager can access
 * - only admin or manager can access
 * - then return staffs
 */
export const getVendorAllStaffs = asyncHandler(async (req, res) => {
  const currentUserId = req.user?.id || req.currentUser?.id;
  if (!currentUserId) throw new UnauthorizedError('User not found');

  const vendorId = req.params?.vendorId;

  const currentUser = await getCurrentVendorAdminOrManager(vendorId, currentUserId);
  if (!currentUser) throw new UnauthorizedError('You are not authorized to access this resource');

  const staffs = await getAllStaffsOfVendor(vendorId);

  res.status(200).json(new ApiResponse(200, { staffs }, 'Staffs fetched successfully'));
});

/**
 * Create vendor staff
 * - Only admin or manager can access
 * - validate user input-{firstName, lastName?, email, password}
 */
export const createVendorStaff = asyncHandler(async (req, res) => {
  const currentUserId: string = req.user.id || req.currentUser.id;
  const vendorId = req.params?.vendorId;
  if (!vendorId) throw new BadRequestError('Vendor id not found');

  const currentUser = await getCurrentVendorAdminOrManager(vendorId, currentUserId);
  if (!currentUser) throw new UnauthorizedError('You are not authorized to access this resource');

  const { email, firstName, lastName, password, phoneNumber } = req.body as TCreateVendorStaff;

  const existingAccount = await prismaClient.account.findFirst({
    where: {
      email,
    },
  });

  if (existingAccount) throw new BadRequestError('You already have an account with this email');

  const account = await prismaClient.account.create({
    data: {
      email,
      role: 'Vendor',
    },
  });

  const hashedPassword = await hashPassword(password);

  await prismaClient.userPassword.create({
    data: {
      user_id: account.id,
      hash: hashedPassword,
    },
  });

  const newStaff = await prismaClient.vendorStaff.create({
    data: {
      vendor_id: vendorId,
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      added_by_id: currentUserId,
      phone_number: phoneNumber,
      account_id: account.id,
      permission: 'Staff',
    },
  });

  res.status(200).json(new ApiResponse(200, { staff: newStaff }, 'Staff created successfully'));
});

/**
 * Get vendor staff
 * - Only admin or manager can access
 * - then return staff
 */
export const getVendorStaff = asyncHandler(async (req, res) => {
  const staffId = req.params?.staffId;

  const staff = await prismaClient.vendorStaff.findFirst({
    where: {
      id: staffId,
    },
  });

  if (!staff) throw new BadRequestError('Staff not found');

  res.status(200).json(new ApiResponse(200, { staff }, 'Vendor staff fetched successfully'));
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
  const currentUserId = req.user?.id || req.currentUser?.id;

  const currentUser = await getCurrentVendorStaff(req.params?.vendorId, currentUserId);
  if (!currentUser) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  if (currentUser.permission === 'Staff') {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const { email, firstName, lastName, phoneNumber, password } = req.body as TUpdateVendorStaff;

  const staffId = req.params?.staffId;

  const staff = await prismaClient.vendorStaff.findUnique({
    where: {
      id: staffId,
      vendor_id: req.params?.vendorId,
    },
  });
  if (!staff) throw new BadRequestError('Staff not found');

  if (
    (staff.permission === 'Manager' && currentUser.permission === 'Admin') ||
    (staff.permission === 'Staff' && currentUser.permission === 'Manager')
  ) {
    throw new BadRequestError('You are not authorized to access this resource');
  }

  const updatedStaff = await prismaClient.vendorStaff.update({
    where: {
      id: staffId,
    },
    data: {
      email: email || staff.email,
      first_name: firstName || staff.first_name,
      last_name: lastName || staff.last_name,
      phone_number: phoneNumber || staff.phone_number,
      password: password ? await hashPassword(password) : staff.password,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, { staff: updatedStaff }, 'Vendor staff updated successfully'));
});

/**
 * Delete vendor staff
 * - Only admin or manager can access
 * - then delete staff
 */
export const deleteVendorStaff = asyncHandler(async (req, res) => {
  const currentUserId = req.user?.id || req.currentUser?.id;

  const currentUser = await prismaClient.vendorStaff.findFirst({
    where: {
      id: currentUserId,
      vendor_id: req.params?.vendorId,
    },
  });

  if (!currentUser) throw new UnauthorizedError('You are not authorized to access this resource');

  if (currentUser.permission === 'Staff') {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const staffId = req.params?.staffId;
  const staff = await prismaClient.vendorStaff.findFirst({
    where: {
      id: staffId,
      vendor_id: req.params?.vendorId,
    },
  });

  if (!staff) throw new BadRequestError('Staff not found');

  if (
    (staff.permission === 'Manager' && currentUser.permission === 'Admin') ||
    (staff.permission === 'Staff' && currentUser.permission === 'Manager')
  ) {
    throw new BadRequestError('You are not authorized to access this resource');
  }

  await prismaClient.vendorStaff.delete({
    where: {
      id: staffId,
      vendor_id: req.params?.vendorId,
    },
  });

  res.status(200).json(new ApiResponse(200, {}, 'Vendor staff deleted successfully'));
});

/**
 * Update vendor staff permission
 * - Only admin or manager can access
 * - then update staff permission
 * - then return staff permission
 */
export const updateVendorStaffPermission = asyncHandler(async (req, res) => {
  const currentUserId = req.user?.id || req.currentUser?.id;

  const currentUser = await getCurrentVendorStaff(req.params?.vendorId, currentUserId);
  if (!currentUser) {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  if (currentUser.permission === 'Staff') {
    throw new UnauthorizedError('You are not authorized to access this resource');
  }

  const staffId = req.params?.staffId;
  const staff = await prismaClient.vendorStaff.findFirst({
    where: {
      id: staffId,
      vendor_id: req.params?.vendorId,
    },
  });

  if (!staff) throw new BadRequestError('Staff not found');

  if (
    (staff.permission === 'Manager' && currentUser.permission === 'Admin') ||
    (staff.permission === 'Staff' && currentUser.permission === 'Manager')
  ) {
    throw new BadRequestError('You are not authorized to access this resource');
  }

  await prismaClient.vendorStaff.update({
    where: {
      id: staffId,
    },
    data: {
      permission: req.body.permission,
    },
  });

  res.status(200).json(new ApiResponse(200, {}, 'Vendor staff permission updated successfully'));
});
