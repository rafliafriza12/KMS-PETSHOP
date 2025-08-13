import { useMutation } from '@tanstack/react-query';
import CatApi from '@/app/service/cat/cat.service';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormBikinKucingSchema } from '@/app/types/form';
import { useRouter } from 'next/navigation';

export const useCreateCat = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const router = useRouter();
  return useMutation<TResponse<any>, Error, FormBikinKucingSchema>({
    mutationFn: CatApi.BikinKucing,
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Menambahakan Kucing',
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
        message: 'Gagal Menambahakan Kucing',
        icon: 'error',
      });
    },
  });
};
