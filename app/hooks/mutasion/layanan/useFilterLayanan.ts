import { useQuery } from '@tanstack/react-query';
import LayananApi from '@/app/service/layanan/layanan.service';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { LayananAppType } from '@/app/types/components';

export const useFilterLayanan = (id: string) => {
  return useQuery<TResponse<LayananAppType>>({
    queryKey: ['layanan', 'detail', id],
    queryFn: () => LayananApi.filterLayanan(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
