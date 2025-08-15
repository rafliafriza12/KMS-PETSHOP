import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CatApi from '@/app/service/cat/cat.service';
import { FormBikinKucingSchema } from '@/app/types/form';
import { useAlert } from '../../alert/costum-alert';
export const useEditCat = (id: string, options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: (payload: FormBikinKucingSchema) => CatApi.Edit(id, payload),
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Menambahakan Kucing',
        icon: 'success',
        onVoid: () => {
          // setUp
          queryClient.invalidateQueries({ queryKey: ['cat'], exact: false });
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Menambahakan Kucing',
        icon: 'error',
      });
    },
  });
};
