import { useMutation } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';
import { useRouter } from 'next/navigation';
import AuthApi from '@/app/service/auth/auth.service';

import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormEditProfileSchema } from '@/app/types/form';
export const useEditProfile = (id: string, options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const router = useRouter();

  return useMutation<TResponse<any>, Error, FormEditProfileSchema>({
    mutationFn: (payload: FormEditProfileSchema) => AuthApi.EditProfile(id, payload),
    onSuccess: () => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasi Edit Profile',
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
        message: 'Gagal Mengedit Profile User',
        icon: 'error',
      });
    },
  });
};
