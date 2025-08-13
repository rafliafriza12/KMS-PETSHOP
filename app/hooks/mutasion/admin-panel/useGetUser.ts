import AdminPanel from '@/app/service/admin-panel/admin-panel.service';

import { useQuery } from '@tanstack/react-query';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: AdminPanel.GetUsers,
    staleTime: 1000 * 60 * 5,
  });
};
