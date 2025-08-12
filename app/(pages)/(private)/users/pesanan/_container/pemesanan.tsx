'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeUserLayout from '@/app/core/layout/home-user';
import Spreed from '@/app/core/components/spreed';
import { CircleAlert, CircleCheckBig, Clock, Clock2, CreditCard, History } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import PesananAktif from '@/app/components/pesanan-aktif';
import { PesananAktifData, RiwayatData } from '@/app/config/component-config';
import { usePathname } from 'next/navigation';
import Riwayat from '@/app/components/riwayat';

const PesananContainer = () => {
  const [isActive, setIsActive] = useState<'Aktif' | 'Riwayat' | null>('Aktif');
  const pathname = usePathname();

  const countPemesanan = (_id?: string) => {
    if (!PesananAktifData || PesananAktifData.length === 0) return 0;

    if (!_id) {
      return PesananAktifData.length;
    }

    return PesananAktifData.filter((item) => item._id === _id).length;
  };

  const countRiwayat = (_id?: string) => {
    if (!RiwayatData || Riwayat.length === 0) return 0;
    if (!_id) {
      return RiwayatData.length;
    }
    return RiwayatData.filter((item) => item._id === _id).length;
  };

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
              <Text className="font-bold">{countPemesanan()}</Text>
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
              <Text className="font-bold">{countRiwayat()}</Text>
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

        {/* komponen */}
        <View className="w-full p-4">
          <View className=" flex l justify-between lg:justify-start lg:items-center gap-2 mb-2">
            <Button
              variant="ghost"
              onClick={() => setIsActive('Aktif')}
              className="flex justify-center items-center"
            >
              <Clock size={66} />
              <Text className="font-bold">Pesanan Aktif {countPemesanan()}</Text>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsActive('Riwayat')}
              className="flex justify-center items-center"
            >
              <CircleCheckBig size={66} />
              <Text className="font-bold">Riwayat {countRiwayat()}</Text>
            </Button>
          </View>
          <Spreed orientation="horizontal" />

          {isActive === 'Aktif' && (
            <>
              {PesananAktifData.length === 0 ? (
                <View className="flex justify-center items-center flex-col mt-4 bg-[var(--shapeV2-parent)] rounded-lg p-4">
                  <Clock size={86} />
                  <View className="flex justify-center items-center flex-col">
                    <Text className="font-semibold">Tidak Ada Pesanan Aktif</Text>
                    <Text className="font-light">
                      Pesanan Anda Akan Muncul Di Sini Setelah Checkout
                    </Text>
                  </View>
                </View>
              ) : (
                PesananAktifData.map((items, key) => <PesananAktif data={items} key={key} />)
              )}
            </>
          )}

          {isActive === 'Riwayat' && (
            <>
              {RiwayatData.length === 0 ? (
                <View className="flex justify-center items-center flex-col mt-4 bg-[var(--shapeV2-parent)] rounded-lg p-4">
                  <History size={86} />
                  <View className="flex justify-center items-center flex-col">
                    <Text className="font-semibold">Tidak Ada Riwayat</Text>
                    <Text className="font-light">
                      Pesanan Anda Akan Muncul Di Sini Setelah Selesai
                    </Text>
                  </View>
                </View>
              ) : (
                RiwayatData.map((items, key) => <Riwayat data={items} key={key} />)
              )}
            </>
          )}
        </View>
      </Container>
    </HomeUserLayout>
  );
};

export default PesananContainer;
