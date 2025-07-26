import axios from 'axios';

import type {
  TLoginSchema,
  TRegisterResendOtpSchema,
  TRegisterSchema,
  TUserVerifySchema,
} from '@/schemas';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error instanceof axios.AxiosError) {
      return Promise.reject(error.response?.data || error);
    }

    return Promise.reject(error);
  },
);

export const registerService = async (values: TRegisterSchema) => {
  return await api.post('/register', values);
};

export const registerResendOtpService = async (values: TRegisterResendOtpSchema) => {
  return await api.post('/register/resend-otp', values);
};

export const registerVerifyService = async (values: TUserVerifySchema) => {
  return await api.post('/register/verify', values);
};

export const loginService = async (values: TLoginSchema) => {
  return await api.post('/login', values);
};

export const logoutService = async () => {
  return await api.post('/logout');
};

export const refreshService = async () => {
  return await api.post('/sessions/refresh');
};
