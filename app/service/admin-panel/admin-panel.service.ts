import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import AxiosClient from '@/app/utils/axios.client';

class AdminPanel {
  async GetDashboard(): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/dashboard`);
    return res.data;
  }
  async GetUsers(): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/user/`);
    return res.data;
  }
}

export default new AdminPanel();
