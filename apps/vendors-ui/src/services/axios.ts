import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error instanceof AxiosError) {
      return Promise.reject(error.response?.data || error.message);
    }

    if (error instanceof Error) {
      return Promise.reject(error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
