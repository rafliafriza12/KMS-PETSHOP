import { useMutation, useQueryClient } from '@tanstack/react-query';
import CatApi from '@/app/service/cat/cat.service';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { useAppDispatch } from '@/app/hooks/dispatch/dispatch';
import { clearSelectedCat } from '@/app/store/CatSlice/catSlice';

export const useDeleteCat = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, string>({
    mutationFn: CatApi.DeleteCat,
    onSuccess: () => {
      dispatch(clearSelectedCat());
      alert.toast({
        title: 'Berhasil',
        message: 'Kucing berhasil dihapus',
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
        message: 'Gagal menghapus kucing',
        icon: 'error',
      });
    },
  });
};
