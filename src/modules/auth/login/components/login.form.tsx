'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TextField from '@/core/components/text-field';
import { cn } from '@/utils/classname';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/services/auth/auth.mutation';
import { schemaLogin, TLogin } from '@/services/auth/auth.type';

export default function LoginForm() {
  const loginMutation = useLogin();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin = async (data: TLogin) => {
    setIsLoading(true);
    loginMutation.mutateAsync(data, {
      onSuccess: () => {
        setIsLoading(false);
        toast.success('Login successful');
      },
      onError: (error) => {
        setIsLoading(false);
        toast.error(error?.message || 'Invalid username or password');
      },
    });
  };

  return (
    <Card className={cn('w-full min-w-[320px] max-w-lg mx-auto')}>
      <CardHeader className={cn('flex items-center justify-center flex-col gap-2')}>
        <CardTitle className="lg:text-4xl">Login to Labskill</CardTitle>
      </CardHeader>

      <CardContent>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
          <div className="grid w-full items-center gap-1.5 mb-4">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  placeholder="Enter your username"
                  error={errors.username?.message}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mb-4">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  forgotPassword
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            variant="default"
            className={cn('text-sm font-normal mb-4 w-full h-10')}
            disabled={isLoading}
          >
            {isLoading ? <Icon icon="eos-icons:three-dots-loading" className="size-5" /> : 'Log in'}
          </Button>

          <div className="grid grid-cols-7 items-center mb-4">
            <hr className="col-span-3 border-t border-black" />
            <p className="col-span-1 text-center text-black">Or</p>
            <hr className="col-span-3 border-t border-black" />
          </div>

          <Button
            type="button"
            variant="outline"
            className={cn(
              'text-sm font-light flex flex-row gap-2 bg-inherit text-gray-900 w-full h-10'
            )}
            disabled={isLoading}
          >
            <Icon icon="flat-color-icons:google" />
            <span>Log in with google</span>
          </Button>
        </form>
      </CardContent>

      <CardFooter className={cn('flex items-center justify-center text-xs')}>
        <p className="text-gray-500">Don&apos;t have an account?</p>
        <Link href="/auth/register" className="text-primary font-normal pl-1">
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
