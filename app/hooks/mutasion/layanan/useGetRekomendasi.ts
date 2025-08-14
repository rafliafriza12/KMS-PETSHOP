import { useQuery } from '@tanstack/react-query';
import LayananApi from '@/app/service/layanan/layanan.service';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
export const useGetRekomendasiLayanan = (id: string) => {
  return useQuery<TResponse<any>>({
    queryKey: ['layanan', 'rekomendasi'],
    queryFn: () => LayananApi.getRekomendasiLayanan(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
