import { useQuery } from '@tanstack/react-query';
import PesananApi from '@/app/service/pesanan/pesanan.service';
export const useGetPesananById = (id: string) => {
  return useQuery({
    queryKey: ['pesanan', 'id', id],
    queryFn: () => PesananApi.GetPesananById(id),
    staleTime: 1000 * 60 * 5,
  });
};
