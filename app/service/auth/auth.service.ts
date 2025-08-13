import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormLoginSchema, FormRegisterSchema } from '@/app/types/form';
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
}

export default new AuthApi();
