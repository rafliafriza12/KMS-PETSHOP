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
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';

const LoginContainer = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Container as="main" className="h-full w-full">
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Card className="w-full max-w-sm shadow-xl rounded-2xl">
          <CardHeader className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary">🐱</span>
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

              {/* Password */}
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

              <Button className="w-full" size="lg">
                Masuk
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default LoginContainer;
