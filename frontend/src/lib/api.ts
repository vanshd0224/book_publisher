import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (typeof window !== 'undefined' && (window as any).__API_BASE_URL__) ||
  'https://book-publisher-backend-451315399249.asia-south1.run.app/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success !== undefined) {
      return response.data;
    }
    return response.data;
  },
  (error) => {
    const errorMsg =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An error occurred';
    return Promise.reject(new Error(errorMsg));
  },
);
