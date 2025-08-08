import { default as Axios } from 'axios';
import { env } from '@/configs/env.config';
import { getSession } from '@/services/auth/auth.store';

// This is for fetching WITHOUT access token
const axios = Axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});

const api = Axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});

const axiosBase = Axios.create({
  baseURL: env.NEXT_PUBLIC_APP_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getSession();

  config.headers.Authorization = `Bearer ${token?.token}`;

  return config;
});

const setToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
};

const handleAxiosError = (error: any) => {
  console.log('error in handleAxiosError', error);
  if (Axios.isAxiosError(error)) {
    return {
      data: error.response?.data || null,
      status: error.response?.status || false,
      message: error.response?.data?.message || 'Something went wrong',
      errors: error.response?.data?.errors || [],
    };
  }

  return { message: 'Something went wrong' };
};

export { axios, api, setToken, axiosBase, handleAxiosError };
