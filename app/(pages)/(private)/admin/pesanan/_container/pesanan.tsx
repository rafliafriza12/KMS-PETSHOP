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
import { PesananAktifType } from '@/app/types/components';
import { useGetPesananAll } from '@/app/hooks/mutasion/pesanan/useGetPesananAll';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';
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
  const pesanan = useGetPesananAll() as unknown as { data?: SummaryResponse };
  const summary = pesanan.data?.summary;
  const data: PesananAktifType[] = Array.isArray(pesanan.data?.data)
    ? pesanan.data?.data
    : pesanan.data?.data
    ? [pesanan.data?.data]
    : [];

  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full">
        <Spreed orientation="horizontal" />
        <View className="flex justify-start items-start p-2 flex-col mt-4">
          <Text className="font-extrabold text-4xl">Pesanan Saya</Text>
          <Text className=" text-sm font-semibold">
            Kelola dan pantau status layanan perawatan kucing Anda
          </Text>
        </View>
        <View className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
          <View className="flex justify-center items-center w-full gap-3 card-glass rounded-xl p-6 shadow-enhanced hover-lift transition-all duration-300">
            <View className="bg-primary/10 p-3 rounded-full backdrop-blur-enhanced animate-glow ">
              <Clock2 size={48} className="text-primary " />
            </View>
            <View className="flex justify-start items-start flex-col">
              <Text className="font-bold text-xl text-gradient-primary">
                {summary?.pending ?? 0}
              </Text>
              <Text className="font-semibold text-base text-foreground">Pesanan Aktif</Text>
            </View>
          </View>
          <View className="flex justify-center items-center w-full gap-3 card-glass rounded-xl p-6 shadow-enhanced hover-lift transition-all duration-300">
            <View className="bg-destructive/10 p-3 rounded-full backdrop-blur-enhanced animate-glow animate-float">
              <CircleAlert size={48} className="text-destructive " />
            </View>
            <View className="flex justify-start items-start flex-col">
              <Text className="font-bold text-xl text-gradient-primary">{summary?.proses}</Text>
              <Text className="font-semibold text-base text-foreground">Sedang Di Proses</Text>
            </View>
          </View>
          <View className="flex justify-center items-center w-full gap-3 card-glass rounded-xl p-6 shadow-enhanced hover-lift transition-all duration-300">
            <View className="bg-success/10 p-3 rounded-full backdrop-blur-enhanced animate-glow animate-float">
              <CircleCheckBig size={48} className="text-success " />
            </View>
            <View className="flex justify-start items-start flex-col">
              <Text className="font-bold text-xl text-gradient-primary">{summary?.selesai}</Text>
              <Text className="font-semibold text-base text-foreground">Selesai</Text>
            </View>
          </View>
          <View className="flex justify-center items-center w-full gap-3 card-glass rounded-xl p-6 shadow-enhanced hover-lift transition-all duration-300">
            <View className="bg-info/10 p-3 rounded-full backdrop-blur-enhanced animate-glow animate-float">
              <CreditCard size={48} className="text-info " />
            </View>
            <View className="flex justify-start items-start flex-col">
              <Text className="font-bold text-xl text-gradient-primary">
                Rp.{summary?.total_transaksi.toLocaleString('id-ID')}
              </Text>
              <Text className="font-semibold text-base text-foreground">Total Transaksi</Text>
            </View>
          </View>
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
              {data.length === 0 ? (
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
    </HomeAdminLayout>
  );
};

export default PesananContainer;
