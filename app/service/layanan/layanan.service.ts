import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { LayananAppType } from '@/app/types/components';
import { FormBikinLayananScham } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';

class LayananApi {
  async getLayanan(): Promise<LayananAppType[]> {
    const res = await AxiosClient.get('/api/layanan');
    return res.data;
  }
  async filterLayanan(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/layanan/${id}`);
    return res.data;
  }
  async DeleteLayanan(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/layanan/${id}`);
    return res.data;
  }
  async CreateLayanan(payload: FormBikinLayananScham): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/layanan', payload);
    return res.data;
  }
  async editLayanan(
    id: string,
    payload: FormBikinLayananScham
  ): Promise<TResponse<LayananAppType>> {
    const res = await AxiosClient.put<TResponse<LayananAppType>>(`/api/layanan/${id}`, payload);
    return res.data;
  }
  async getRekomendasiLayanan(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/layanan/${id}/rekomendasi`);
    return res.data;
  }
}

export default new LayananApi();
