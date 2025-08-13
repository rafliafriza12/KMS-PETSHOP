import { useQuery } from '@tanstack/react-query';
import CatApi from '@/app/service/cat/cat.service';
export const useGetCatAll = () => {
  return useQuery({
    queryKey: ['cat', 'all'],
    queryFn: CatApi.GetCatAll,
    staleTime: 1000 * 60 * 5,
  });
};
