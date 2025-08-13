import { useMutation } from '@tanstack/react-query';
import AuthApi from '@/app/service/auth/auth.service';
import { useRouter } from 'next/navigation';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormRegisterSchema } from '@/app/types/form';

export const useRegister = () => {
  const router = useRouter();
  const alert = useAlert();
  return useMutation<TResponse<any>, Error, FormRegisterSchema>({
    mutationFn: AuthApi.registerUser,
    onSuccess: (res) => {
      alert.toast({
        title: 'Behasil',
        message: 'Behasil Register',
        icon: 'success',
        onVoid: () => {
          router.push('/login');
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
