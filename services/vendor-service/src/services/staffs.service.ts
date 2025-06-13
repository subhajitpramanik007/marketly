import { prismaClient } from '@marketly/db';
import { BadRequestError, UnauthorizedError } from '@marketly/http';
import { Request } from 'express';

export async function getCurrentVendorAdminOrManager(vendorId: string, currentUserId: string) {
  // check if user is admin or manager
  return await prismaClient.vendorStaff.findFirst({
    where: {
      vendor_id: vendorId,
      account_id: currentUserId,
      permission: {
        in: ['Admin', 'Manager'],
      },
    },
  });
}

export async function getCurrentVendorStaff(vendorId: string, currentUserId: string) {
  return await prismaClient.vendorStaff.findFirst({
    where: {
      vendor_id: vendorId,
      account_id: currentUserId,
    },
  });
}

export async function getAllStaffsOfVendor(vendorId: string) {
  return await prismaClient.vendorStaff.findMany({
    where: {
      vendor_id: vendorId,
    },
  });
}
