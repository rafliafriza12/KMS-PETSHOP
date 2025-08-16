import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormBikinKnowledgeSchema } from '@/app/types/form';
import AxiosClient from '@/app/utils/axios.client';

class KnowLedgeApi {
  async Create(id: string, payload: FormBikinKnowledgeSchema): Promise<TResponse<any>> {
    const res = await AxiosClient.post(`/api/knowledge/${id}`, payload);
    return res.data;
  }
  async Get(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/knowledge/${id}`);
    return res.data;
  }
  async Delete(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/knowledge/${id}`);
    return res.data;
  }
}

export default new KnowLedgeApi();
