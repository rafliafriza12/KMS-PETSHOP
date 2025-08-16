import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { Pesanan } from '@/app/types/components';
import { FormCheckOutSchema, FormStatusPemesananaSchema } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';

class PesananApi {
  async CheckOut(payload: FormCheckOutSchema): Promise<Pesanan> {
    const res = await AxiosClient.post('/api/pesanan/checkout', payload);
    return res.data;
  }
  async GetPesanan(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/pesanan/');
    return res.data;
  }
  async EditStatus(id: string, payload: FormStatusPemesananaSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/pesanan/item/${id}`, payload);
    return res.data;
  }
  async GetPesananById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/pesanan/${id}`);
    return res.data;
  }
  async GetPesananAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/pesanan/all');
    return res.data;
  }
}

export default new PesananApi();
