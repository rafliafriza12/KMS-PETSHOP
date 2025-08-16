import { useQuery } from '@tanstack/react-query';
import PesananApi from '@/app/service/pesanan/pesanan.service';
export const useGetPesananAll = () => {
  return useQuery({
    queryKey: ['pesanan', 'all'],
    queryFn: () => PesananApi.GetPesananAll(),
    staleTime: 1000 * 60 * 5,
  });
};
