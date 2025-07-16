import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
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
      return Promise.reject(error.response?.data.message || error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
