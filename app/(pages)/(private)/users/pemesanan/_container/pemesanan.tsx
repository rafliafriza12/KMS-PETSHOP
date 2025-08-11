'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeUserLayout from '@/app/core/layout/home-user';
import Spreed from '@/app/core/components/spreed';
import { CircleAlert, CircleCheckBig, Clock2, CreditCard } from 'lucide-react';
import { useState } from 'react';
const PemesananContainer = () => {
  const [isActive, setIsActive] = useState<'Aktif' | 'Riwayat' | null>(null);
  return (
    <HomeUserLayout>
      <Container as="main" className="w-full h-full">
        <Spreed orientation="horizontal" />
        <View className="flex justify-start items-start p-2 flex-col mt-4">
          <Text className="font-extrabold text-4xl">Pesanan Saya</Text>
          <Text className=" text-sm font-semibold">
            Kelola dan pantau status layanan perawatan kucing Anda
          </Text>
        </View>
        <View className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 p-2">
          <View className="flex justify-center items-center w-full gap-2 border rounded-lg p-4 shadow-lg">
            <View className="bg-[#DBEAFE] p-2 rounded-full">
              <Clock2 size={40} className="text-[#2563EB]" />
            </View>
            <View className="flex justify-start items-start flex-col">
              <Text className="font-bold">0</Text>
              <Text className="font-semibold">Pesanan Aktif</Text>
            </View>
          </View>
          <View className="flex justify-center items-center w-full gap-2 border rounded-lg p-4 shadow-lg">
            <View className="bg-[#F3E8FF] p-2 rounded-full">
              <CircleAlert size={40} className="text-[#9333EA]" />
            </View>
            <View className="flex justify-start items-start flex-col">
              <Text className="font-bold">0</Text>
              <Text className="font-semibold">Sedang Di Proses</Text>
            </View>
          </View>
          <View className="flex justify-center items-center w-full gap-2 border rounded-lg p-4 shadow-lg">
            <View className="bg-[#DCFCE7] p-2 rounded-full">
              <CircleCheckBig size={40} className="text-[#2CAD5C]" />
            </View>
            <View className="flex justify-start items-start flex-col">
              <Text className="font-bold">0</Text>
              <Text className="font-semibold">Selesai</Text>
            </View>
          </View>
          <View className="flex justify-center items-center w-full gap-2 border rounded-lg p-4 shadow-lg">
            <View className="bg-[#E0E7FF] p-2 rounded-full">
              <CreditCard size={40} className="text-[#4F46E5]" />
            </View>
            <View className="flex justify-start items-start flex-col">
              <Text className="font-bold">Rp.0</Text>
              <Text className="font-semibold">Total Transaksi</Text>
            </View>
          </View>
        </View>

        {/* Component */}
        <View className="w-full"></View>
      </Container>
    </HomeUserLayout>
  );
};

export default PemesananContainer;
