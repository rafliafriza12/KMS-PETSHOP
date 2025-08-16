import View from './ui/view';
import { Text } from './ui/Text';
import { Label } from '@radix-ui/react-label';
import { Calendar, CircleCheckBig, Clock, CreditCard, Heart } from 'lucide-react';
import Spreed from '../core/components/spreed';
import { KucingType, LayananAppType, PesananAktifType } from '../types/components';
import { useGetLayanan } from '../hooks/mutasion/layanan/useGetLayanan';
import { useGetCat } from '../hooks/mutasion/cat/useGetCat';
import Container from './ui/container';
import { getDate } from '../utils/string.format';
interface Props {
  data: PesananAktifType;
}

const Riwayat = ({ data }: Props) => {
  const layananQuery = useGetLayanan();
  const catQuery = useGetCat();
  // Ilmu
  const layananList: LayananAppType[] = layananQuery.data || [];
  // Ilmu
  const catAll = (catQuery.data?.data ?? []) as KucingType[];

  const handleBaghe = (text: string) => {
    if (text === 'UNPAID') {
      return (
        <Label className="p-1 rounded-sm lg:p-2 bg-[#DCFCE7] text-[#2CAD5C]">Belum Lunas</Label>
      );
    }
  };

  const status = {
    PENDING: {
      bg: 'bg-[#EDE9FE]',
      text: 'text-[#6D28D9]',
      icon: <Clock />,
      label: 'Pending',
    },
    PROSES: {
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#B91C1C]',
      icon: <Heart />,
      label: 'Proses',
    },
    SELESAI: {
      bg: 'bg-[#DCFCE7]',
      text: 'text-[#15803D]',
      icon: <CircleCheckBig />,
      label: 'Selesai',
    },
  };

  const handleBagheStatus = (text: string) => {
    const badge = status[text as keyof typeof status];
    if (!badge) return null;

    return (
      <View
        className={`flex justify-center scale-70 lg:scale-100  items-center gap-3 rounded-lg ${badge.bg} ${badge.text} p-2`}
      >
        {badge.icon}
        <Label className={`${badge.text}`}>{badge.label}</Label>
      </View>
    );
  };

  return (
    <View className="w-full p-2 border bg-[var(--shapeV2-parent)] rounded-lg mt-4">
      {data.items.map((items, key) => {
        let layanan: LayananAppType | undefined;
        let kucing: KucingType | undefined;

        if (typeof items.layananId === 'string') {
          layanan = layananList.find((l) => l._id === items.layananId);
        } else {
          layanan = items.layananId as LayananAppType;
        }

        if (typeof items.kucingId === 'string') {
          kucing = catAll.find((c) => c._id === items.kucingId);
        } else {
          kucing = items.kucingId as KucingType;
        }
        return (
          <Container key={key}>
            {items.statusPesanan === 'SELESAI' ? (
              <View>
                <View className="flex justify-between items-center ">
                  <View className="flex justify-center items-center gap-4">
                    <Text className="font-bold text-2xl">{layanan?.namaLayanan}</Text>
                    {handleBagheStatus(items.statusPesanan)}
                  </View>
                  <Label className="font-bold text-sm lg:text-2xl">Rp.{layanan?.harga} </Label>
                </View>
                <View className="flex justify-between items-center">
                  <Label className="font-light">Untuk Kucing :{kucing?.namaKucing}</Label>
                  <Label className="font-bold text-lg ">{data.metodePembayaran}</Label>
                </View>
                <Label className="font-light text-lg">ID Pesanan: {items.pesananId}</Label>
                <View className="grid grid-cols-2 gap-4 mt-4">
                  <View className="flex justify-start items-center gap-2">
                    <Calendar />
                    <Text className="text-sm lg:text-lg">Jadwal: {getDate(items.jadwal)}</Text>
                  </View>
                  <View className="flex justify-end items-center gap-2">
                    <CreditCard />
                    <Text className="text-sm lg:text-lg">
                      Status Pembayaran: {handleBaghe(items.statusPembayaran)}
                    </Text>
                  </View>
                </View>
                <Spreed orientation="horizontal" className="my-2" />
              </View>
            ) : null}
          </Container>
        );
      })}
    </View>
  );
};

export default Riwayat;
