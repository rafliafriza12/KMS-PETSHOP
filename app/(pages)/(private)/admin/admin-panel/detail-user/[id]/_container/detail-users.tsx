'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import { useParams } from 'next/navigation';
import { useGetProfileById } from '@/app/hooks/mutasion/auth/useGetProfileById';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';
import { getDate } from '@/app/utils/string.format';
import {
  Key,
  User,
  Mail,
  Calendar,
  BookUser,
  Shield,
  Clock,
  UserCheck,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import Spreed from '@/app/core/components/spreed';
import { Label } from '@radix-ui/react-label';
import React from 'react';

const DetailUsersContainer = () => {
  const params = useParams();
  const id = params.id as string;
  const data = useGetProfileById(id);
  const baseData = data.data?.data;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!baseData) {
    return (
      <HomeAdminLayout>
        <Container as="main" className="w-full h-full">
          <View className="flex justify-center items-center min-h-screen">
            <View className="flex flex-col items-center gap-4">
              <View className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></View>
              <Text className="text-gray-600">Memuat data user...</Text>
            </View>
          </View>
        </Container>
      </HomeAdminLayout>
    );
  }

  const userFields = [
    {
      label: 'User ID',
      value: baseData._id,
      icon: <Key size={20} className="text-gray-600" />,
      type: 'id',
      copyable: true,
      fullValue: baseData._id,
    },
    {
      label: 'Nama Lengkap',
      value: baseData?.namaLengkap,
      icon: <User size={20} className="text-blue-600" />,
      type: 'name',
      copyable: true,
      fullValue: baseData?.namaLengkap,
    },
    {
      label: 'Email Address',
      value: baseData.email,
      icon: <Mail size={20} className="text-green-600" />,
      type: 'email',
      copyable: true,
      fullValue: baseData.email,
    },
    {
      label: 'Role',
      value: baseData.role,
      icon: <Shield size={20} className="text-purple-600" />,
      type: 'role',
      copyable: false,
      fullValue: baseData.role,
    },
    {
      label: 'Tanggal Dibuat',
      value: getDate(baseData.createdAt),
      icon: <Calendar size={20} className="text-orange-600" />,
      type: 'date',
      copyable: false,
      fullValue: getDate(baseData.createdAt),
    },
    {
      label: 'Terakhir Diperbarui',
      value: getDate(baseData.updatedAt),
      icon: <Clock size={20} className="text-indigo-600" />,
      type: 'date',
      copyable: false,
      fullValue: getDate(baseData.updatedAt),
    },
  ];

  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full min-h-screen">
        <View className="max-w-7xl mx-auto px-4 py-8">
          <View className="text-center mb-10">
            <View className="flex justify-center items-center gap-3 mb-4">
              <View className="p-3 gradient-primary rounded-full shadow-enhanced animate-glow">
                <BookUser size={28} className="text-primary-foreground " />
              </View>
              <Text className="text-3xl font-bold text-gradient-primary">Detail Pengguna</Text>
            </View>
            <Text className="text-foreground">Informasi lengkap profil pengguna sistem</Text>
          </View>

          <View className="card-glass rounded-2xl shadow-enhanced border-gray-200/50 animate-glow overflow-hidden mb-8">
            <View className="gradient-primary p-8">
              <View className="flex items-center justify-between">
                <View className="flex items-center gap-4">
                  <View className="w-16 h-16 gradient-primary/20 rounded-full flex items-center justify-center backdrop-blur-enhanced">
                    <UserCheck size={32} className="text-primary " />
                  </View>
                  <View className="flex flex-col">
                    <Text className="text-2xl font-bold text-primary-foreground">
                      {baseData.namaLengkap || 'Nama tidak tersedia'}
                    </Text>
                    <Label className="text-primary-foreground mt-1">{baseData.email}</Label>
                  </View>
                </View>
                <View className="text-right">
                  <Text className="inline-flex items-center px-4 py-2 gradient-primary/20  rounded-full text-sm font-semibold border-2 border-primary/50 animate-glow hover:scale-105 transition-all duration-300">
                    <Shield size={16} className="mr-2  " />
                    {baseData.role?.toUpperCase() || 'USER'}
                  </Text>
                </View>
              </View>
            </View>

            <View className="p-8">
              <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userFields.map((field, index) => (
                  <View
                    key={field.label}
                    className="group relative card-glass rounded-xl border-gray-200/50 p-6 hover:gradient-primary/10 backdrop-blur-enhanced hover-lift hover:scale-105 transition-all duration-300 animate-glow"
                  >
                    <View className="flex items-center justify-between mb-3">
                      <View className="flex items-center gap-3">
                        <View className="p-2 gradient-primary/20 rounded-lg group-hover:gradient-primary/30 transition-colors">
                          {React.cloneElement(field.icon, {
                            className: 'text-primary w-5 h-5 ',
                          })}
                        </View>
                        <Text className="font-semibold text-sm text-foreground">{field.label}</Text>
                      </View>

                      {field.copyable && field.fullValue && (
                        <button
                          onClick={() => handleCopy(field.fullValue, field.label)}
                          className="p-2 hover:bg-[var(--shapeV2-parent)]/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 animate-glow"
                          title="Salin ke clipboard"
                        >
                          {copiedField === field.label ? (
                            <Check size={16} className="text-success " />
                          ) : (
                            <Copy size={16} className="text-foreground " />
                          )}
                        </button>
                      )}
                    </View>

                    <View className="space-y-2 flex flex-col">
                      {field.type === 'role' ? (
                        <Label className="inline-flex items-center px-3 py-1 gradient-primary/20 text-primary rounded-full text-sm font-medium border-2 border-primary/50 animate-glow hover:scale-105 transition-all duration-300">
                          {field.value?.toUpperCase() || 'N/A'}
                        </Label>
                      ) : (
                        <Text className="text-foreground">{field.value || 'N/A'}</Text>
                      )}

                      {field.copyable && copiedField === field.label && (
                        <Text className="text-success text-xs">Berhasil disalin!</Text>
                      )}
                    </View>

                    <View className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></View>
                  </View>
                ))}
              </View>
            </View>

            <Spreed orientation="horizontal" className="border-gray-200/50 animate-glow" />
            <View className="gradient-primary/10 px-8 py-4 backdrop-blur-enhanced">
              <View className="flex items-center justify-between text-sm text-foreground">
                <View className="flex items-center gap-2">
                  <View className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></View>
                  <Label>Status: Aktif</Label>
                </View>
                <View className="flex items-center gap-4">
                  <Label>ID: {baseData._id?.slice(-8)}</Label>
                  <Label className="text-foreground/50">•</Label>
                  <Label>Role: {baseData.role}</Label>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </HomeAdminLayout>
  );
};

export default DetailUsersContainer;
