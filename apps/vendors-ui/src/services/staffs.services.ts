import { ApiResponse, IVendorStaff } from '@/types';
import api from './axios';
import { StaffSchema, StaffUpdateSchema } from '@/schemas/staff.schemas';

export const getAllStaffs = (storeId: number): Promise<ApiResponse<{ staffs: IVendorStaff[] }>> => {
  return api.get(`/vendors/${storeId}/staffs`);
};

export const createStaff = (
  storeId: number,
  data: StaffSchema,
): Promise<ApiResponse<{ staff: IVendorStaff }>> => {
  return api.post(`/vendors/${storeId}/staffs`, data);
};

export const getStaff = (
  storeId: number,
  staffId: number,
): Promise<ApiResponse<{ staff: IVendorStaff }>> => {
  return api.get(`/vendors/${storeId}/staffs/${staffId}`);
};

export const updateStaff = (
  storeId: number,
  staffId: number,
  data: StaffUpdateSchema,
): Promise<ApiResponse<{ staff: IVendorStaff }>> => {
  return api.patch(`/vendors/${storeId}/staffs/${staffId}`, data);
};

export const deleteStaff = (storeId: number, staffId: number): Promise<ApiResponse<{}>> => {
  return api.delete(`/vendors/${storeId}/staffs/${staffId}`);
};

export const updateStaffPermission = (
  storeId: number,
  staffId: number,
  data: { permission: 'owner' | 'manager' | 'staff' },
): Promise<ApiResponse<{ staff: IVendorStaff }>> => {
  return api.patch(`/vendors/${storeId}/staffs/${staffId}/permission`, data);
};

export const updateStaffAvatar = (storeId: number, staffId: number, data: { imageId: number }) => {
  return api.post(`/vendors/${storeId}/staffs/${staffId}/avatar`, data);
};
