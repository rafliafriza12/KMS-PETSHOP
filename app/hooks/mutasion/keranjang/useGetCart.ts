import { useQuery } from '@tanstack/react-query';
import KeranjangApi from '@/app/service/keranjang/keranjang.service';

export const useGetChart = () => {
  return useQuery({
    queryKey: ['cart', 'byUser'],
    queryFn: async () => {
      try {
        const res = await KeranjangApi.Get();
        return res;
      } catch (err: any) {
        if (err.response?.status === 404) {
          return { data: [] };
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};
