'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeUserLayout from '@/app/core/layout/home-user';
import Spreed from '@/app/core/components/spreed';
import { CircleCheckBig, Clock, History } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import PesananAktif from '@/app/components/pesanan-aktif';
import { useGetPesanan } from '@/app/hooks/mutasion/pesanan/useGetPesanan';
import { PesananAktifType } from '@/app/types/components';
import Riwayat from '@/app/components/riwayat';
type SummaryResponse = {
  data: PesananAktifType[];
  summary: {
    proses: number;
    pending: number;
    selesai: number;
    total_transaksi: number;
  };
};

const PesananContainer = () => {
  const [isActive, setIsActive] = useState<'Aktif' | 'Riwayat'>('Aktif');
  const pesanan = useGetPesanan() as unknown as { data?: SummaryResponse };
  const summary = pesanan.data?.summary;
  const data: PesananAktifType[] = Array.isArray(pesanan.data?.data)
    ? pesanan.data?.data
    : pesanan.data?.data
    ? [pesanan.data?.data]
    : [];

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

        <View className="w-full p-4">
          <View className=" flex l justify-between lg:justify-start lg:items-center gap-2 mb-2">
            <Button
              variant="ghost"
              onClick={() => setIsActive('Aktif')}
              className="flex justify-center items-center"
            >
              <Clock size={66} />
              <Text className="font-bold">
                Pesanan Aktif {(summary?.pending ?? 0) + (summary?.proses ?? 0)}
              </Text>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsActive('Riwayat')}
              className="flex justify-center items-center"
            >
              <CircleCheckBig size={66} />
              <Text className="font-bold">Riwayat {summary?.selesai}</Text>
            </Button>
          </View>
          <Spreed orientation="horizontal" />

          {
            <View className="space-y-4">
              {(isActive === 'Aktif' && (summary?.pending ?? 0) + (summary?.proses ?? 0) === 0) ||
              (isActive === 'Riwayat' && (summary?.selesai ?? 0) === 0) ? (
                <View className="flex flex-col justify-center items-center mt-6 bg-[var(--shapeV2-parent)] rounded-lg p-6 gap-4">
                  <Clock size={86} />
                  <View className="flex flex-col justify-center items-center gap-2 text-center">
                    <Text className="font-semibold text-lg">Tidak Ada Pesanan Aktif</Text>
                    <Text className="font-light text-sm">
                      Pesanan Anda akan muncul di sini setelah checkout
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="w-full">
                  {data.map((items, key) => (
                    <div className="flex" key={key}>
                      <PesananAktif data={items} tabActive={isActive} />
                    </div>
                  ))}
                </View>
              )}
            </View>
          }
        </View>
      </Container>
    </HomeUserLayout>
  );
};

export default PesananContainer;
