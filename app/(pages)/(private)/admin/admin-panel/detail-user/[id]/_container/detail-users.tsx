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
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <Text className="text-gray-600">Memuat data user...</Text>
            </div>
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

  const formatDisplayValue = (value: string, type: string) => {
    if (!value) return 'N/A';

    if (type === 'id' && value.length > 12) {
      return `${value.slice(0, 8)}...${value.slice(-4)}`;
    }

    if (value.length > 25) {
      return value.slice(0, 25) + '...';
    }

    return value;
  };

  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full min-h-screen">
        <View className="max-w-7xl mx-auto px-4 py-8 ">
          <div className="text-center mb-10">
            <View className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-full shadow-lg">
                <BookUser size={28} className="text-white" />
              </div>
              <Text className="text-3xl font-bold ">Detail Pengguna</Text>
            </View>
            <Text className="">Informasi lengkap profil pengguna sistem</Text>
          </div>

          <div className="bg-[var(--shapeV2-parent)] rounded-2xl shadow-2xl border  overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[var(--shapeV1-parent)]  to-[var(--shapeV1-children)]  p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <UserCheck size={32} />
                  </div>
                  <div className="flex flex-col ">
                    <Text className="text-2xl font-bold">
                      {baseData.namaLengkap || 'Nama tidak tersedia'}
                    </Text>
                    <Label className="text-blue-100 mt-1">{baseData.email}</Label>
                  </div>
                </div>
                <div className="text-right">
                  <Label
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2  bg-white/90`}
                  >
                    <Shield size={16} className="mr-2" />
                    {baseData.role?.toUpperCase() || 'USER'}
                  </Label>
                </div>
              </div>
            </div>

            <div className="p-8">
              <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userFields.map((field, index) => (
                  <div
                    key={field.label}
                    className="group relative   rounded-xl border border-[var(--shapeV1-parent)] p-6 hover:[var(--shapeV1-child)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--shapeV2-parent)] rounded-lg group-hover:bg-blue-50 transition-colors">
                          {field.icon}
                        </div>
                        <Text className="font-semibold  text-sm">{field.label}</Text>
                      </div>

                      {field.copyable && field.fullValue && (
                        <button
                          onClick={() => handleCopy(field.fullValue, field.label)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Salin ke clipboard"
                        >
                          {copiedField === field.label ? (
                            <Check size={16} className="text-green-600" />
                          ) : (
                            <Copy size={16} className="text-gray-500" />
                          )}
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {field.type === 'role' ? (
                        <Label
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border `}
                        >
                          {field.value?.toUpperCase() || 'N/A'}
                        </Label>
                      ) : null}

                      {field.copyable && copiedField === field.label && (
                        <Text className="text-green-600 text-xs">Berhasil disalin!</Text>
                      )}
                    </div>

                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </View>
            </div>

            <Spreed orientation="horizontal" />
            <div className="bg-[var(--shapeV2-parent)] px-8 py-4">
              <div className="flex items-center justify-between text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Label>Status: Aktif</Label>
                </div>
                <div className="flex items-center gap-4">
                  <Label>ID: {baseData._id?.slice(-8)}</Label>
                  <Label>•</Label>
                  <Label>Role: {baseData.role}</Label>
                </div>
              </div>
            </div>
          </div>
        </View>
      </Container>
    </HomeAdminLayout>
  );
};

export default DetailUsersContainer;
