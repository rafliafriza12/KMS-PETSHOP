import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PesananApi from '@/app/service/pesanan/pesanan.service';
import { FormStatusPembayaranSchema } from '@/app/types/form';
import { useAlert } from '../../alert/costum-alert';

export const useEditPembayaran = (id: string) => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: (payload: FormStatusPembayaranSchema) => PesananApi.EditPembayaran(id, payload),
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Edit Pesanana',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ queryKey: ['pesanan'], exact: false });
        },
      });
    },
    onError: (err) => {
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Edit Pesanan',
        icon: 'error',
      });
    },
  });
};
