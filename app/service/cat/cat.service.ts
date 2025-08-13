import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormBikinKucingSchema } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';

class CatApi {
  async BikinKucing(payload: FormBikinKucingSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/kucing', payload);
    return res.data;
  }
  async GetCat(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/kucing');
    return res.data;
  }
  async GetCatAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/kucing/all');
    return res.data;
  }
  async DeleteCat(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/kucing/${id}`);
    return res.data;
  }
}

export default new CatApi();
