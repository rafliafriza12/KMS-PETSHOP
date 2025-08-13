import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormEditProfileSchema, FormLoginSchema, FormRegisterSchema } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';

class AuthApi {
  async registerUser(payload: FormRegisterSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/register', payload);
    return res.data;
  }
  async LoginUser(payload: FormLoginSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/login', payload);
    return res.data;
  }
  async GetProfile(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('api/user/profile/me');
    return res.data;
  }
  async DeleteUser(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/user/${id}`);
    return res.data;
  }
  async EditProfile(
    id: string,
    payload: FormEditProfileSchema
  ): Promise<TResponse<FormEditProfileSchema>> {
    const res = await AxiosClient.put(`/api/user/${id}`, payload);
    return res.data;
  }
}

export default new AuthApi();
