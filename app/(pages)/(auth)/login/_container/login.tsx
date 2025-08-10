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
import { Eye, EyeOff, Mail, Lock, Cat } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import AuthLayout from '@/app/core/layout/auth-layout';

const LoginContainer = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <AuthLayout>
      <Container as="main" className="h-full w-full">
        <div className="flex justify-center items-center min-h-screen p-4 ">
          <Card className="w-full max-w-sm shadow-xl rounded-2xl  ">
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
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email Anda"
                      className="pl-10"
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

                <Button className="w-full font-semibold" size="lg">
                  Masuk
                </Button>

                <div className="flex justify-center items-center">
                  <Link href="/register">
                    <Label className="text-sm font-semibold cursor-pointer ">
                      Daftarkan Akun Anda!
                    </Label>
                  </Link>
                </div>
                <div className="flex justify-center items-center flex-col gap-2">
                  <div className="w-full border"></div>
                  <div>
                    <Link href="/forgot-password">
                      <Label className="text-sm font-semibold cursor-pointer ">
                        Lupa Kata Sandi?
                      </Label>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </AuthLayout>
  );
};

export default LoginContainer;
