import { useQuery } from '@tanstack/react-query';
import KnowLedgeApi from '@/app/service/knowledge/know.service';
export const useGetKnow = (id: string) => {
  return useQuery({
    queryKey: ['knowledge'],
    queryFn: () => KnowLedgeApi.Get(id),
    staleTime: 1000 * 60 * 5,
  });
};
