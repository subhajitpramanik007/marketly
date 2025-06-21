import {
  TVendorLogin,
  TVendorRegistrationEmail,
  TVendorRegistrationEmailVerification,
} from '@marketly/lib/schemas/vendor';
import api from './axios';

export const register = (data: TVendorRegistrationEmail) => {
  return api.post('/auth/vendors/register', data);
};

export const registerVerify = (data: TVendorRegistrationEmailVerification) => {
  return api.post('/auth/vendors/register/verify', data);
};

export const resendRegistrationOtp = (data: TVendorRegistrationEmail) => {
  return api.post('/auth/vendors/register/resend-otp', data);
};

export const login = (data: TVendorLogin) => {
  return api.post('/auth/vendors/login', data);
};

export const logout = () => {
  return api.post('/auth/vendors/logout');
};
