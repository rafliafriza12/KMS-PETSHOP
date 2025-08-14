import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormAddToChartSchema } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';

class KeranjangApi {
  async Add(payload: FormAddToChartSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/keranjang/items', payload);
    return res.data;
  }
}

export default new KeranjangApi();
