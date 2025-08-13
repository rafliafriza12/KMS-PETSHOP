import { useQuery } from '@tanstack/react-query';
import CatApi from '@/app/service/cat/cat.service';
export const useGetCat = () => {
  return useQuery({
    queryKey: ['cat'],
    queryFn: CatApi.GetCat,
    staleTime: 1000 * 60 * 5,
  });
};
