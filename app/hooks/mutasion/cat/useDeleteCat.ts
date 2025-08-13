import { useMutation } from '@tanstack/react-query';
import CatApi from '@/app/service/cat/cat.service';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/hooks/dispatch/dispatch';
import { clearSelectedCat } from '@/app/store/CatSlice/catSlice';

export const useDeleteCat = (options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation<TResponse<any>, Error, string>({
    mutationFn: CatApi.DeleteCat,
    onSuccess: () => {
      dispatch(clearSelectedCat());
      alert.toast({
        title: 'Berhasil',
        message: 'Kucing berhasil dihapus',
        icon: 'success',
      });
      router.refresh();
      options?.onAfterSuccess?.();
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
