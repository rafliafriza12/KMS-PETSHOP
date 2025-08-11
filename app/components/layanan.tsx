import View from './ui/view';
import { Heart, Clock, Check, Scissors, House, GraduationCap, Apple, Star } from 'lucide-react';
import { LayananAppTypeProps } from '../types/props';
import { Text } from './ui/Text';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';

const LayananComponent: React.FC<LayananAppTypeProps> = ({ data }) => {
  const kategori = {
    Grooming: {
      bg: 'bg-[#EDE9FE]',
      text: 'text-[#6D28D9]',
      icon: <Scissors />,
    },
    Kesehatan: {
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#B91C1C]',
      icon: <Heart />,
    },
    Penitipan: {
      bg: 'bg-[#DBEAFE]',
      text: 'text-[#1D4ED8]',
      icon: <House />,
    },
    Nutrisi: {
      bg: 'bg-[#FFEDD5]',
      text: 'text-[#C2410C]',
      icon: <Apple />,
    },
    Pelatihan: {
      bg: 'bg-[#DCFCE7]',
      text: 'text-[#16A34A]',
      icon: <GraduationCap />,
    },
  };

  const RekomendasiStyle = {
    'Sangat Direkomendasikan': {
      bg: 'bg-red-100',
      text: 'text-red-600',
    },
    Rekomendasi: {
      bg: 'bg-[#FEF9C3]',
      text: 'text-[#9F5F1D]',
    },
  };

  const handleIcon = (text: string) => {
    const cat = kategori[text as keyof typeof kategori];
    if (!cat) return null;

    return <View className={`text-sm px-2 py-1 rounded-lg ${cat.bg} ${cat.text}`}>{cat.icon}</View>;
  };

  const handleBagheKategori = (text: string) => {
    const cat = kategori[text as keyof typeof kategori];
    if (!cat) return null;

    return (
      <Label className={`text-sm font-light px-2 py-1 rounded-lg ${cat.bg} ${cat.text}`}>
        {text}
      </Label>
    );
  };

  const handlePupolar = (text: string) => {
    if (!text) {
      return null;
    }
    return (
      <Label
        className={`text-xs font-medium px-3 py-1 rounded-full bg-[#FEF9C3] text-[#9F5F1D] flex items-center gap-2`}
      >
        <Star />
        {text}
      </Label>
    );
  };

  const handleRekomendasi = (text: string) => {
    if (!text) return null;
    const rec = RekomendasiStyle[text as keyof typeof RekomendasiStyle];
    if (!rec) {
      return null;
    }
    return (
      <Label className={`text-xs font-medium px-3 py-1 rounded-full ${rec.bg} ${rec.text}`}>
        {text}
      </Label>
    );
  };

  return (
    <View className=" bg-[var(--shapeV2-parent)] rounded-lg  shadow p-4 space-y-4">
      <View className="flex items-start justify-between">
        <View className="flex items-center gap-2">
          <View className="">{handleIcon(data.kategori)}</View>
          {handleBagheKategori(data.kategori)}
        </View>
        <View className="flex justify-center items-center flex-col gap-4">
          {handlePupolar(data.popular ?? '')}
          {handleRekomendasi(data.rekomendasi ?? '')}
        </View>
      </View>

      <View>
        <Text className="font-bold text-lg">{data.judul}</Text> <br />
        <Text className="">{data.deskripsi}</Text>
      </View>

      <View className="flex items-center justify-between">
        <View className="flex items-center gap-1  text-sm">
          <Clock size={16} />
          <Label>{data.durasi}</Label>
        </View>
        <Label className="text-[var(--shapeV1-child)] font-bold text-lg">{data.harga}</Label>
      </View>

      <View className="border border-[var(--shapeV2-parent)] bg-[#F0FDF4]/90 rounded-lg p-3 space-y-1">
        <p className="font-medium text-green-800">Mengapa cocok untuk kucing Anda:</p>
        <ul className="space-y-1 text-green-700">
          {data.alasan.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check size={16} className="text-green-600" /> {item}
            </li>
          ))}
        </ul>
      </View>

      <Button className="w-full font-semibold ">Tambah ke Keranjang</Button>
    </View>
  );
};

export default LayananComponent;
