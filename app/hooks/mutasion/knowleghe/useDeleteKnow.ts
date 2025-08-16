import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import KnowLedgeApi from '@/app/service/knowledge/know.service';
import { useAlert } from '../../alert/costum-alert';
import { useRouter } from 'next/navigation';

export const useDeleteKnow = (id: string) => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => KnowLedgeApi.Delete(id),
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil ',
        message: 'Behasil Delete',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ queryKey: ['knowledge'] });
          router.push('/admin/admin-panel');
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal ',
        message: 'Gagal Delete',
        icon: 'error',
      });
    },
  });
};
