import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import KeranjangApi from '@/app/service/keranjang/keranjang.service';
export const useDeleteAll = () => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => KeranjangApi.DeleteAll(),
    onSuccess: () => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Hapus Semua',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ queryKey: ['cart'], exact: false });
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Hapus Semua Item',
        icon: 'error',
      });
    },
  });
};
