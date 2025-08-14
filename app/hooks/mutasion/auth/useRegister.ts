import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthApi from '@/app/service/auth/auth.service';
import { usePathname, useRouter } from 'next/navigation';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormRegisterSchema } from '@/app/types/form';

export const useRegister = (options?: { onAfterSuccess?: () => void }) => {
  const router = useRouter();
  const alert = useAlert();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  return useMutation<TResponse<any>, Error, FormRegisterSchema>({
    mutationFn: AuthApi.registerUser,
    onSuccess: (res) => {
      alert.toast({
        title: 'Behasil',
        message: 'Behasil Register',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
          queryClient.invalidateQueries({ queryKey: ['admin'], exact: false });
          if (pathname.startsWith('/admin/admin-panel')) {
            router.push('/admin/admin-panel');
          } else {
            router.push('/login');
          }
        },
      });
    },
    onError: () => {
      alert.toast({
        title: 'Gagal Mendaftar',
        icon: 'error',
        message: 'Gagal',
      });
    },
  });
};
