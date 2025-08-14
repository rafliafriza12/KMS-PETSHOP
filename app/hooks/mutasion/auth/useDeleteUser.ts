import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import AuthApi from '@/app/service/auth/auth.service';

export const useDeleteUser = () => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, string>({
    mutationFn: AuthApi.DeleteUser,
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Hapus User',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ queryKey: ['admin'], exact: false });
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Menghapus User',
        icon: 'error',
      });
    },
  });
};
