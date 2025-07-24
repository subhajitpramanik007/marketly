import type { IUser } from '@/types/user.types';
import api from './api';
import type { IApiResponse } from '@/types/api-response.types';

export const getMeService = (): Promise<IApiResponse<{ user: IUser }>> => {
  return api.get('/consumers/me');
};
