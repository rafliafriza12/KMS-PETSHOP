import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { useMutation } from '@tanstack/react-query';
import PesananApi from '@/app/service/pesanan/pesanan.service';
import { useAlert } from '../../alert/costum-alert';
import { FormStatusPemesananaSchema } from '@/app/types/form';
export const useEditPesanan = (id: string) => {
  const alert = useAlert();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: (payload: FormStatusPemesananaSchema) => PesananApi.EditStatus(id, payload),
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Edit Pesanana',
        icon: 'success',
        onVoid: () => {
          // Nanti Setup
          // queryClient.invalidateQueries({ queryKey: ['cart'], exact: false });
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
