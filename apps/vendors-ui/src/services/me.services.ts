// me - get session data
import { ApiResponse, TVendorSession } from '@/types';
import api from './axios';

export const getCurrentSessionData = (): Promise<ApiResponse<TVendorSession>> => {
  return api.get('/vendors/me');
};
