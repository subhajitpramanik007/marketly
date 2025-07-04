import { ApiResponse, IImage } from '@/types';
import api from './axios';

export const uploadSingleImage = (
  data: FormData,
  onUploadProgress?: (progress: number) => void,
): Promise<ApiResponse<{ imageData: IImage }>> => {
  return api.post('/uploads', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress(progressEvent) {
      if (progressEvent && progressEvent?.total && onUploadProgress) {
        const progress = Math.floor(
          Math.round((progressEvent.loaded * 100) / progressEvent?.total),
        );
        onUploadProgress(progress);
      }
    },
  });
};

export const multipleImagesUpload = (
  data: FormData,
  onUploadProgress?: (progress: number) => void,
): Promise<ApiResponse<{ imagesData: IImage[] }>> => {
  return api.post('/uploads/multiple', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: event => {
      if (onUploadProgress && event && event?.total) {
        const progress = Math.floor(Math.round((event.loaded * 100) / event?.total));
        onUploadProgress(progress);
      }
    },
  });
};

export const deleteImage = (publicIds: string[]) => {
  return api.delete(`/uploads`, { data: { publicIds } });
};
