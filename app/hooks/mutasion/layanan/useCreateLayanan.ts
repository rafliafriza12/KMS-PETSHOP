import { useMutation } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormBikinLayananScham } from '@/app/types/form';
import LayananApi from '@/app/service/layanan/layanan.service';
import { useRouter } from 'next/navigation';

export const useCreateLayanan = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const router = useRouter();
  return useMutation<TResponse<any>, Error, FormBikinLayananScham>({
    mutationFn: LayananApi.CreateLayanan,
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasi Menambah Layanan',
        icon: 'success',
        onVoid: () => {
          setTimeout(() => {
            router.refresh();
            options?.onAfterSuccess?.();
          }, 2000);
        },
      });
    },
    onError: () => {
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Menambahakan Layanan',
        icon: 'error',
      });
    },
  });
};
