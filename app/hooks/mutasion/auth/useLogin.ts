'use client';

import { useMutation } from '@tanstack/react-query';
import AuthApi from '@/app/service/auth/auth.service';
import { useRouter } from 'next/navigation';
import { useAlert } from '../../alert/costum-alert';
import { TResponse } from '@/app/pkg/react-query/mutation-wrapper.type';
import { FormLoginSchema } from '@/app/types/form';
import { useAppDispatch } from '../../dispatch/dispatch';
import { userSchema } from '@/app/types/api';
import { setCurrentUser } from '@/app/store/AuthSlice/authSlice';

export const useLogin = () => {
  const router = useRouter();
  const alert = useAlert();
  const dispatch = useAppDispatch();

  return useMutation<TResponse<any>, Error, FormLoginSchema>({
    mutationFn: AuthApi.LoginUser,
    onSuccess: (res) => {
      const valid = res.data.role;
      if (valid === 'USER') {
        router.push('/users');
      } else if (valid === 'ADMIN') {
        router.push('/admin');
      } else {
        return null;
      }

      const userPayload: userSchema = {
        user: res.data,
      };

      dispatch(setCurrentUser(userPayload));
      console.log(valid);
      alert.toast({
        title: 'Berhasil',
        message: 'Berhasil Login',
        icon: 'success',
      });
    },
    onError: (err) => {
      console.log(err);
      alert.toast({
        title: 'Gagal Login',
        icon: 'error',
        message: 'Email atau password salah',
      });
    },
  });
};
