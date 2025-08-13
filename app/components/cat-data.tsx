'use client';
import View from './ui/view';
import { Text } from './ui/Text';
import Container from './ui/container';
import { Cat, Filter, Scissors, Heart, Home, GraduationCap, Apple } from 'lucide-react';
import { LayananAppData } from '../config/component-config';

export interface CatType {
  _id?: string;
  namaKucing: string;
  ras: string;
  umur: number | null;
  berat: number | null;
  tingkatAktivitas: string;
  kondisiKesehatan: string[];
}

interface FilterItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface CatDataProps {
  data?: CatType | null;
}

const CatData: React.FC<CatDataProps> = ({ data }) => {
  const filterData: FilterItem[] = [
    { id: 'all', label: 'Semua Layanan', icon: <Filter size={16} /> },
    { id: 'grooming', label: 'Grooming', icon: <Scissors size={16} /> },
    { id: 'kesehatan', label: 'Kesehatan', icon: <Heart size={16} /> },
    { id: 'penitipan', label: 'Penitipan', icon: <Home size={16} /> },
    { id: 'pelatihan', label: 'Pelatihan', icon: <GraduationCap size={16} /> },
    { id: 'nutrisi', label: 'Nutrisi', icon: <Apple size={16} /> },
  ];

  const countByKategori = (kategori: string = 'all') => {
    if (kategori === 'all') return LayananAppData.length;
    return LayananAppData.filter((item) => item.kategori.toLowerCase() === kategori.toLowerCase())
      .length;
  };

  return (
    <Container className="w-full">
      <View className="flex justify-start items-center gap-2">
        <View className="rounded-full bg-[var(--shapeV1-parent)] p-2 z-0">
          <Cat className="w-5 h-5 z-1" />
        </View>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-2xl font-bold">Layanan Untuk: {data?.namaKucing}</Text>
          <View className="flex justify-center items-center gap-1">
            <Text className="text-lg">{data?.ras}</Text>
            <Text className="text-lg">{data?.umur} Tahun</Text>
            <Text className="text-lg">{data?.berat} Kg</Text>
          </View>
        </View>
      </View>

      <View className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 mt-4 bg-[var(--shapeV2-parent)]/60 rounded-sm p-4 text-center">
        <Container className="flex justify-center">
          <View className="flex justify-center items-center flex-col">
            <Text className="text-lg font-bold">{countByKategori()}</Text>
            <Text>Layanan Tersedia</Text>
          </View>
        </Container>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-lg font-semibold">6</Text>
          <Text>Sangat Direkomendasikan</Text>
        </View>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-lg font-bold">1</Text>
          <Text>Promo Tersedia</Text>
        </View>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-lg font-semibold">990</Text>
          <Text>Total Menit</Text>
        </View>
      </View>
    </Container>
  );
};

export default CatData;
