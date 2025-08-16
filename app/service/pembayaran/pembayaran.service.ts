import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormPembayaranShema } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';

class PembayaranApi {
  async Pay(payload: FormPembayaranShema): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/pembayaran', payload);
    return res.data;
  }
}

export default new PembayaranApi();
