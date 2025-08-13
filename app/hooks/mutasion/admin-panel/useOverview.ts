import AdminPanel from '@/app/service/admin-panel/admin-panel.service';

import { useQuery } from '@tanstack/react-query';

export const useOverview = () => {
  return useQuery({
    queryKey: ['admin', 'overview'],
    queryFn: AdminPanel.GetDashboard,
    staleTime: 1000 * 60 * 5,
  });
};
