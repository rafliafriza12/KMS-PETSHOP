import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '../../alert/costum-alert';

import AuthApi from '@/app/service/auth/auth.service';

import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormEditProfileSchema } from '@/app/types/form';
export const useEditProfile = (id: string, options?: { onAfterSuccess?: () => void }) => {
  const alert = useAlert();
  const queryClient = useQueryClient();
  return useMutation<TResponse<any>, Error, FormEditProfileSchema>({
    mutationFn: (payload: FormEditProfileSchema) => AuthApi.EditProfile(id, payload),
    onSuccess: () => {
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasi Edit Profile',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ queryKey: ['admin'], exact: false });
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
