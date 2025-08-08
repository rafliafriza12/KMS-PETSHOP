import { useMutation } from '@tanstack/react-query';
import { TLogin } from './auth.type';
import { objectToFormData } from '@/utils/form-data.util';
import { validateSchemaLogin } from './auth.store';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ username, password }: TLogin) => {
      const formData = objectToFormData({ username, password });
      const res = await validateSchemaLogin(undefined, formData);

      return res;
    },
  });
};
