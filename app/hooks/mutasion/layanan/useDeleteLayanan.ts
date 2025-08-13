import { useRouter } from 'next/navigation';
import { useAlert } from '../../alert/costum-alert';
import LayananApi from '@/app/service/layanan/layanan.service';
import { useMutation } from '@tanstack/react-query';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';

export const useDeleteLayanan = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const router = useRouter();
  return useMutation<TResponse<any>, Error, string>({
    mutationFn: LayananApi.DeleteLayanan,
    onSuccess: () => {
      alert.toast({
        title: 'Berhasil',
        message: 'Layanan berhasil dihapus',
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
        message: 'Gagal menghapus kucing',
        icon: 'error',
      });
    },
  });
};
