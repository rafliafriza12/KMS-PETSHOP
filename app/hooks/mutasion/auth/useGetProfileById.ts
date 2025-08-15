import { useQuery } from '@tanstack/react-query';
import AuthApi from '@/app/service/auth/auth.service';

export const useGetProfileById = (id: string) => {
  return useQuery({
    queryKey: ['profile', 'byId'],
    queryFn: () => AuthApi.GetUserById(id),
    staleTime: 1000 * 60 * 5,
  });
};
