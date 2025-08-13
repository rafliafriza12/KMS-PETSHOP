import { useMutation } from '@tanstack/react-query';
import LayananApi from '@/app/service/layanan/layanan.service';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormBikinLayananScham } from '@/app/types/form';
import { LayananAppType } from '@/app/types/components';
import { useAlert } from '../../alert/costum-alert';
import { useRouter } from 'next/navigation';

export const useEditLayanan = (id: string, options?: { onAfterSuccess?: () => void }) => {
  const router = useRouter();
  const alert = useAlert();
  return useMutation<TResponse<LayananAppType>, Error, FormBikinLayananScham>({
    mutationFn: (payload: FormBikinLayananScham) => LayananApi.editLayanan(id, payload),
    onSuccess: () => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasi Menambah Layanan',
        icon: 'success',
        onVoid: () => {
          router.refresh();
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Mengedit Layanan',
        icon: 'error',
      });
    },
  });
};
