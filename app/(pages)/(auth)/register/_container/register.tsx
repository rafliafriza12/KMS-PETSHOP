'use client';
import Container from '@/app/components/ui/container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, Cat, Target } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import AuthLayout from '@/app/core/layout/auth-layout';
import { FormRegisterSchema } from '@/app/types/form';
import { useRegister } from '@/app/hooks/mutasion/auth/useRegister';
import Fallback from '@/app/components/ui/fallback';
import { useAlert } from '@/app/hooks/alert/costum-alert';
import { isPending } from '@reduxjs/toolkit';

const RegisterContainer = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formRegsiter, setFormRegister] = useState<FormRegisterSchema>({
    email: '',
    namaLengkap: '',
    password: '',
    role: '',
  });
  const alert = useAlert();

  const Register = useRegister();

  const handleRegister = () => {
    if (!formRegsiter.email || !formRegsiter.namaLengkap || !formRegsiter.password) {
      alert.toast({
        title: 'Cek Kolom',
        message: 'Coba Lagi',
        icon: 'warning',
      });
      return;
    }
    return Register.mutate(formRegsiter);
  };
  return (
    <AuthLayout>
      <Container as="main" className="w-full h-full">
        <div className="flex justify-center items-center min-h-screen p-4">
          <Card className="w-full max-w-sm shadow-xl rounded-2xl">
            <CardHeader className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Cat />
              </div>
              <CardTitle className="text-center text-lg font-bold">KMS PETSHOP</CardTitle>
              <CardDescription className="text-center text-sm">
                Sistem Rekomendasi Perawatan Kucing
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="text">Nama</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="text"
                      type="email"
                      placeholder="Masukkan email Anda"
                      className="pl-10"
                      onChange={(e) =>
                        setFormRegister((prev) => {
                          const newObj = { ...prev, namaLengkap: e.target.value };
                          return newObj;
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email Anda"
                      className="pl-10"
                      onChange={(e) =>
                        setFormRegister((prev) => {
                          const newObj = { ...prev, email: e.target.value };
                          return newObj;
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password Anda"
                      className="pl-10 pr-10"
                      onChange={(e) =>
                        setFormRegister((prev) => {
                          const newObj = { ...prev, password: e.target.value };
                          return newObj;
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button
                  className="w-full font-semibold"
                  size="lg"
                  onClick={() => handleRegister()}
                  disabled={Register.isPending}
                >
                  {Register.isPending ? <Fallback title="Tunggu Sebentar" /> : 'Daftar'}
                </Button>
              </div>
              <div className="flex justify-center items-center mt-2">
                <Link href="/login">
                  <Label className="text-sm font-semibold cursor-pointer ">
                    Anda Sudah Memiliki Akun?
                  </Label>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </AuthLayout>
  );
};

export default RegisterContainer;
