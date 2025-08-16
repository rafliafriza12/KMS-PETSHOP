import { useMutation } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormPembayaranShema } from '@/app/types/form';
import PembayaranApi from '@/app/service/pembayaran/pembayaran.service';

export const usePembayaran = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  return useMutation<TResponse<any>, Error, FormPembayaranShema>({
    mutationFn: PembayaranApi.Pay,
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Pembayaran Berhasil',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal',
        message: 'Pembayaran Gagal',
        icon: 'error',
      });
    },
  });
};
