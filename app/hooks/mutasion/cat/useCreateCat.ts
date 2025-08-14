import { useMutation, useQueryClient } from '@tanstack/react-query';
import CatApi from '@/app/service/cat/cat.service';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormBikinKucingSchema } from '@/app/types/form';

export const useCreateCat = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormBikinKucingSchema>({
    mutationFn: CatApi.BikinKucing,
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Menambahakan Kucing',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ queryKey: ['cat'], exact: false });
          options?.onAfterSuccess?.();
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
