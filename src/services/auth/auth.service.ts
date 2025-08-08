import { api, axiosBase, handleAxiosError } from '@/utils/axios.client';
import type { TLogin, TLoginResponse } from './auth.type';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';

const login = async (data: TLogin) => {
  try {
    const response = await api.post<TResponse<TLoginResponse>>('/auth/login', data);

    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const verifyToken = async (token: string) => {
  try {
    const response = await api.post<TResponse<null | object>>('/auth/verify-access', { token });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const deleteSession = async () => {
  try {
    const response = await axiosBase.post('/api/session/delete');
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const authService = {
  login,
  verifyToken,
  deleteSession,
};
