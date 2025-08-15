import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import KeranjangApi from '@/app/service/keranjang/keranjang.service';
export const useDeleteOne = (id: string) => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => KeranjangApi.Delete(id),
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Hapus',
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
        message: 'Gagal Hapus Item',
        icon: 'error',
      });
    },
  });
};
