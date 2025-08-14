import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { useAlert } from '../../alert/costum-alert';
import { FormBikinKnowledgeSchema } from '@/app/types/form';
import KnowLedgeApi from '@/app/service/knowledge/know.service';

export const useCreateKnow = (id: string, options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, FormBikinKnowledgeSchema>({
    mutationFn: (payload: FormBikinKnowledgeSchema) => KnowLedgeApi.Create(id, payload),
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Tambah KnowLedge',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
          queryClient.invalidateQueries({ queryKey: ['layanan'], exact: false });
        },
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal',
        message: 'Gagal Menanmbahkan KnowLedge',
        icon: 'error',
      });
    },
  });
};
