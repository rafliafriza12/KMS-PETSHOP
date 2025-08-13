import LayananApi from '@/app/service/layanan/layanan.service';
import { useQuery } from '@tanstack/react-query';
import { LayananAppType } from '@/app/types/components';

export const useGetLayanan = () => {
  return useQuery<LayananAppType[]>({
    queryKey: ['layanan', 'all'],
    queryFn: LayananApi.getLayanan,
    staleTime: 1000 * 60 * 5,
  });
};
