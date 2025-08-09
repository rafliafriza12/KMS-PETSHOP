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
import { Mail, Cat } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import AuthLayout from '@/app/core/layout/auth-layout';

const ForgotPasswordContainer = () => {
  return (
    <AuthLayout>
      <Container as="main" className="w-full h-full">
        <div className="flex justify-center items-center min-h-screen ">
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

export default ForgotPasswordContainer;
