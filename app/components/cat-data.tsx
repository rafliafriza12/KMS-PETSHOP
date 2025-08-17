'use client';
import View from './ui/view';
import { Text } from './ui/Text';
import Container from './ui/container';
import { Cat } from 'lucide-react';
import { useGetLayanan } from '../hooks/mutasion/layanan/useGetLayanan';
import { LayananAppType } from '../types/components';

export interface CatType {
  _id?: string;
  namaKucing: string;
  ras: string;
  umur: number | null;
  berat: number | null;
  tingkatAktivitas: string;
  kondisiKesehatan: string[];
}

interface CatDataProps {
  data?: CatType | null;
}

const CatData: React.FC<CatDataProps & { countLayanan: any } & { countRekomendasi: any }> = ({
  data,
  countLayanan,
  countRekomendasi,
}) => {
  const countTersediaByKategori = (kategori: string = 'all') => {
    if (kategori === 'all') return countLayanan?.length;
    return countLayanan.filter(
      (item: any) => item.layanan.kategori.toLowerCase() === kategori.toLowerCase()
    ).length;
  };

  const countSangatDirekomendasikanByKategori = (knowledge_id: string = 'all') => {
    const rekomendasiArray = Object.values(countRekomendasi || {});
    if (knowledge_id === 'all') return rekomendasiArray.length;
    return rekomendasiArray.filter(
      (item: any) => item.layanan.kategori?.toLowerCase() === knowledge_id.toLowerCase()
    ).length;
  };

  const countDiskonAll = (diskon: number | 'all') => {
    if (diskon === 'all') return countLayanan?.length;
    return countLayanan.filter((item: any) => item.layanan.diskon.toLowerCase() === diskon).length;
  };

  const totalMenit = () => {
    if (!countRekomendasi || countRekomendasi.length === 0) return 0;

    return countRekomendasi.reduce((acc: number, item: any) => {
      return acc + (item.layanan.durasiLayanan ?? 0);
    }, 0);
  };

  return (
    <Container className="w-full p-6 card-glass rounded-xl shadow-enhanced">
      <View className="flex justify-start items-center gap-4">
        <View className=" rounded-full bg-primary/10 p-3 card-glass backdrop-blur-enhanced animate-glow">
          <Cat className="w-6 h-6 text-primary " />
        </View>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-3xl font-bold text-gradient-primary">
            Layanan Untuk: {data?.namaKucing}
          </Text>
          <View className="flex justify-center items-center gap-3 text-base text-muted-foreground mt-2">
            <Text className="text-gradient-neutral">{data?.ras}</Text>
            <Text className="text-foreground">•</Text>
            <Text className="text-gradient-neutral">{data?.umur} Tahun</Text>
            <Text className="text-foreground">•</Text>
            <Text className="text-gradient-neutral">{data?.berat} Kg</Text>
          </View>
        </View>
      </View>

      <View className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 bg-gradient-primary/20 card-glass rounded-xl p-6 shadow-enhanced">
        <Container className="flex justify-center hover-lift transition-all duration-300">
          <View className="flex justify-center items-center flex-col text-center">
            <Text className="text-xl font-bold text-gradient-primary">
              {countSangatDirekomendasikanByKategori()}
            </Text>
            <Text className="text-base font-semibold text-foreground">Sangat Direkomendasikan</Text>
          </View>
        </Container>
        <Container className="flex justify-center hover-lift transition-all duration-300">
          <View className="flex justify-center items-center flex-col text-center">
            <Text className="text-xl font-bold text-gradient-primary">
              {countTersediaByKategori()}
            </Text>
            <Text className="text-base font-semibold text-foreground">Jumlah Layanan Tersedia</Text>
          </View>
        </Container>
        <Container className="flex justify-center hover-lift transition-all duration-300">
          <View className="flex justify-center items-center flex-col text-center">
            <Text className="text-xl font-bold text-gradient-primary">{countDiskonAll('all')}</Text>
            <Text className="text-base font-semibold text-foreground">Promo Tersedia</Text>
          </View>
        </Container>
        <Container className="flex justify-center hover-lift transition-all duration-300">
          <View className="flex justify-center items-center flex-col text-center">
            <Text className="text-xl font-bold text-gradient-primary">{totalMenit()}</Text>
            <Text className="text-base font-semibold text-foreground">Total Menit</Text>
          </View>
        </Container>
      </View>
    </Container>
  );
};

export default CatData;
