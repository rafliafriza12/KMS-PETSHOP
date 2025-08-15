import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormAddToChartSchema } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';

class KeranjangApi {
  async Add(payload: FormAddToChartSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/keranjang/items', payload);
    return res.data;
  }
  async Get(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/keranjang');
    return res.data;
  }
  async Delete(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/keranjang/items/${id}`);
    return res.data;
  }
  async DeleteAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.delete('/api/keranjang/items');
    return res.data;
  }
}

export default new KeranjangApi();
