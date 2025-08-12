import View from './ui/view';
import { Text } from './ui/Text';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import Spreed from '../core/components/spreed';
import { Calendar, CircleCheckBig, Clock, CreditCard } from 'lucide-react';
import { PesananAktifTypeProps } from '../types/props';
const PesananAktif: React.FC<PesananAktifTypeProps> = ({ data }) => {
  return (
    <View className="w-full p-2 border bg-[var(--shapeV2-parent)] rounded-lg mt-4">
      <View className="flex justify-between items-center ">
        <View className="flex justify-center items-center gap-4">
          <Text className="font-bold text-2xl ">Konsultasi Nutrisi</Text>
          <View className="flex justify-center scale-70 lg:scale-100 items-center gap-2 rounded-lg bg-[#DBEAFE] p-2">
            <CircleCheckBig className="text-[#2563EB]" />
            <Label className="text-[#2563EB]">Dikonfirmasi</Label>
          </View>
        </View>
        <Label className="font-bold text-sm lg:text-2xl">Rp. {data.harga}</Label>
      </View>
      <View className="flex justify-between items-center">
        <Label className="font-light">Untuk Kucing :</Label>
        <Label className="font-bold text-lg text-[var(--shapeV1-child)]">
          {data.metodePembayaran}
        </Label>
      </View>
      <Label className="font-light text-lg">ID Pesanan:{data.idPesanan}</Label>
      <View className="grid grid-cols-2 grid-rows-1 gap-2 mt-4">
        <View className="flex justify-start items-center gap-1">
          <Calendar />
          <Text className="text-sm lg:text-lg">Jadwal :{data.jadwal}</Text>
        </View>
        <View className="flex justify-start items-center gap-1">
          <CreditCard />
          <Text className="text-sm lg:text-lg">Status Pembayaran :{data.status}</Text>
        </View>
        <View className="flex justify-start items-center gap-1">
          <Clock />
          <Text className="text-sm lg:text-lg">Estimasi Selesai :{data.estimasiWaktu}</Text>
        </View>
        <Text className="text-sm lg:text-lg">DiPesan :{data.dipesan}</Text>
      </View>
      <Spreed orientation="horizontal" className="my-2" />
      <View className="flex lg:justify-start justify-between gap-0 lg:gap-2">
        <Button variant="ghost" className="font-semibold bg-[#F3E8FF] text-[#9333EA]">
          Mulai Proses
        </Button>
        <Button variant="ghost" className="font-semibold bg-[#DCFCE7] text-[#2CAD5C]">
          Ditandai Selesai
        </Button>
      </View>
    </View>
  );
};

export default PesananAktif;
