import { useQuery } from '@tanstack/react-query';
import PesananApi from '@/app/service/pesanan/pesanan.service';
export const useGetPesanan = () => {
  return useQuery({
    queryKey: ['pesanan', 'user'],
    queryFn: () => PesananApi.GetPesanan(),
    staleTime: 1000 * 60 * 5,
  });
};
