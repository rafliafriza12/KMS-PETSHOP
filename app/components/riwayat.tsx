import View from './ui/view';
import { Text } from './ui/Text';
import { Label } from '@radix-ui/react-label';
import { Calendar, CircleCheckBig, Clock, CreditCard } from 'lucide-react';
import Spreed from '../core/components/spreed';
import { RiwayatTypeProps } from '../types/props';

const Riwayat: React.FC<RiwayatTypeProps> = ({ data }) => {
  return (
    <View className="w-full p-2 border bg-[var(--shapeV2-parent)] rounded-lg mt-4">
      <View className="flex justify-between items-center ">
        <View className="flex justify-center items-center gap-4">
          <Text className="font-bold text-2xl ">Konsultasi Nutrisi</Text>
          <View className="flex justify-center scale-70 lg:scale-100 items-center gap-2 rounded-lg bg-[#DCFCE7] p-2">
            <CircleCheckBig className="text-[#2CAD5C]" />
            <Label className="text-[#2CAD5C]">Selesai</Label>
          </View>
        </View>
        <Label className="font-bold text-sm lg:text-2xl">Rp.{data.harga} </Label>
      </View>
      <View className="flex justify-between items-center">
        <Label className="font-light">Untuk Kucing :{data.nama}</Label>
        <Label className="font-bold text-lg text-[var(--shapeV1-child)]">
          {data.metodePembayaran}
        </Label>
      </View>
      <Label className="font-light text-lg">ID Pesanan:{data.idPesanan}</Label>
      <View className="grid grid-cols-2 grid-rows-1 gap-2 mt-4">
        <View className="flex justify-start items-center gap-1">
          <Calendar />
          <Text className="text-sm lg:text-lg">Jadwal: {data.jadwal}</Text>
        </View>
        <View className="flex justify-start items-center gap-1">
          <CreditCard />
          <Text className="text-sm lg:text-lg">Status Pembayaran: {data.status}</Text>
        </View>
        <View className="flex justify-start items-center gap-1">
          <Clock />
          <Text className="text-sm lg:text-lg">Estimasi Selesai: {data.estimasiWaktu}</Text>
        </View>
        <Text className="text-sm lg:text-lg">DiPesan: {data.dipesan}</Text>
      </View>
      <Spreed orientation="horizontal" className="my-2" />
      <View className="w-ful gap-2 flex flex-col">
        <View className="flex justify-start p-2 bg-[#DBEAFE] rounded-lg">
          <Label className=" font-extrabold text-[#2563EB]">Catatan: {data.catatan}</Label>
        </View>
        <View className="flex justify-start p-2 rounded-lg bg-[#DCFCE7]">
          <Label className="font-extrabold text-[#2CAD5C]">Selesai pada: {data.selesai}</Label>
        </View>
      </View>
    </View>
  );
};

export default Riwayat;
