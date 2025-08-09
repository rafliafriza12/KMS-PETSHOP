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
import { Eye, EyeOff, Lock, Cat } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import AuthLayout from '@/app/core/layout/auth-layout';

const ResetPasswordContainer = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordV1, setShowPasswordV1] = useState<boolean>(false);
  return (
    <AuthLayout>
      <Container as="main" className="w-full h-full">
        <div className="flex justify-center items-center min-h-screen">
          <Card className="w-full max-w-sm shadow-xl rounded-2xl">
            <CardHeader className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Cat />
              </div>
              <CardTitle className="text-center text-lg font-bold">KMS PETSHOP</CardTitle>
              <CardDescription className="text-center text-sm">
                Sistem Rekomendasi Perawatan Kucing
              </CardDescription>
              <CardDescription className="text-center text-sm">Reset Password</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
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

                <div className="space-y-1">
                  <Label htmlFor="password">Confirmasi Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPasswordV1 ? 'text' : 'password'}
                      placeholder="Masukkan password Anda"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordV1(!showPasswordV1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPasswordV1 ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full" size="lg">
                  Verifikasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </AuthLayout>
  );
};

export default ResetPasswordContainer;
