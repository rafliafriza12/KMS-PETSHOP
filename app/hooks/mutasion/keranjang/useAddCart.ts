import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import KeranjangApi from '@/app/service/keranjang/keranjang.service';

export const useAddCart = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: KeranjangApi.Add,
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Masukan Ke keranjang',
        icon: 'success',
        onVoid: () => {
          // Nanti Setup
          // queryClient.invalidateQueries({ queryKey: ['cat'], exact: false });
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Masukkan Ke Keranjang',
        icon: 'error',
      });
    },
  });
};
