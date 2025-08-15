import AuthApi from '@/app/service/auth/auth.service';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: AuthApi.GetProfile,
    staleTime: 1000 * 60 * 5,
  });
};
