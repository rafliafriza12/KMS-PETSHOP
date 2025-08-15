import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormCheckOutSchema, FormStatusPemesananaSchema } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';
import { headers } from 'next/headers';

class PesananApi {
  async CheckOut(payload: FormCheckOutSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/pesanan/checkout', payload);
    return res.data;
  }
  async GetPesanan(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/pesanan/');
    return res.data;
  }
  async EditStatus(id: string, payload: FormStatusPemesananaSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`api/pesanan/item/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  }
}

export default new PesananApi();
