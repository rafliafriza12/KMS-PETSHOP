import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import PesananApi from '@/app/service/pesanan/pesanan.service';
export const useCheckout = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: PesananApi.CheckOut,
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Checkout Items',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
          // Nanti Setup
          queryClient.invalidateQueries({ queryKey: ['cart'], exact: false });
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Checkout Items',
        icon: 'error',
      });
    },
  });
};
