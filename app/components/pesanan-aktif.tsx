import View from './ui/view';
import { Text } from './ui/Text';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import Spreed from '../core/components/spreed';
import { Calendar, CircleCheckBig, Clock, CreditCard } from 'lucide-react';
import { useGetLayanan } from '../hooks/mutasion/layanan/useGetLayanan';
import { KucingType, LayananAppType, PesananAktifType } from '../types/components';
import { useGetCat } from '../hooks/mutasion/cat/useGetCat';
import { getTime } from '../utils/string.format';
import { getDate } from '../utils/string.format';
import Container from './ui/container';
import { useEditPesanan } from '../hooks/mutasion/pesanan/useEdiStatus';
import { useEffect, useState } from 'react';
import { FormStatusPemesananaSchema } from '../types/form';
interface Props {
  data: PesananAktifType;
}
const PesananAktif = ({ data }: Props) => {
  const layananQuery = useGetLayanan();
  const catQuery = useGetCat();
  // Ilmu
  const layananList: LayananAppType[] = layananQuery.data || [];
  // Ilmu
  const catAll = (catQuery.data?.data ?? []) as KucingType[];
  const [select, setSetSelect] = useState<'PENDING' | 'PROSES' | 'SELESAI'>('PENDING');
  const [id, setId] = useState<string | null>(null);

  const EditStatus = useEditPesanan(id || '');
  const [formEdit, setFormEdit] = useState<FormStatusPemesananaSchema>({
    statusPesanan: '',
  });

  useEffect(() => {
    setFormEdit((prev) => ({
      ...prev,
      statusPesanan: select,
    }));
  }, [select]);

  const handleEditStatus = () => {
    if (!id || !select) {
      console.log('Kosong');
    }
    EditStatus.mutate(formEdit);
  };

  const handleBaghe = (text: string) => {
    if (text === 'UNPAID') {
      return <Label className="p-1 rounded-sm lg:p-2 bg-[#DCFCE7] text-[#2CAD5C]">Lunas</Label>;
    }
  };
  const baghe = (text: string) => {
    if (text === 'PENDING') {
      return <Label className="p-1 rounded-sm lg:p-2 bg-yellow-100 text-yellow-700">Pending</Label>;
    } else if (text === 'PROSES') {
      return <Label className="p-1 rounded-sm lg:p-2 bg-blue-100 text-blue-700">Proses</Label>;
    } else if (text === 'SELESAI') {
      return <Label className="p-1 rounded-sm lg:p-2 bg-green-100 text-green-700">Selesai</Label>;
    }
  };

  return (
    <View className="w-full p-2 rounded-lg mt-4 space-y-6">
      {data.items.map((items, index) => {
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
          <Container
            key={index}
            className="space-y-4 p-4 rounded-lg shadow bg-[var(--shapeV2-parent)]"
          >
            <View className="flex justify-between items-center">
              <View className="flex justify-center items-center gap-6">
                <Text className="font-bold text-2xl">{layanan?.namaLayanan}</Text>
                <View className="flex justify-center scale-70 lg:scale-100 items-center gap-3 rounded-lg bg-[#DBEAFE] p-2">
                  <CircleCheckBig className="text-[#2563EB]" />
                  <Label className="text-[#2563EB]">{baghe(items.statusPesanan)}</Label>
                </View>
              </View>
              <Label className="font-bold text-sm lg:text-2xl">Rp. {layanan?.harga}</Label>
            </View>

            <View className="flex justify-between items-center">
              <Label className="font-light">Untuk Kucing : {kucing?.namaKucing}</Label>
              <Label className="font-bold text-lg text-[var(--shapeV1-child)]">
                {data.metodePembayaran}
              </Label>
            </View>

            <Label className="font-light text-lg">ID Pesanan: {items._id}</Label>

            <View className="grid grid-cols-2 gap-4 mt-4">
              <View className="flex justify-start items-center gap-2">
                <Calendar />
                <Text className="text-sm lg:text-lg">Jadwal: {getDate(items.jadwal)}</Text>
              </View>
              <View className="flex justify-start items-center gap-2">
                <CreditCard />
                <Text className="text-sm lg:text-lg">
                  Status Pembayaran: {handleBaghe(items.statusPembayaran)}
                </Text>
              </View>
              <View className="flex justify-start items-center gap-2">
                <Clock />
                <Text className="text-sm lg:text-lg">
                  Estimasi Selesai: {getTime(items.jadwal)}
                </Text>
              </View>
            </View>

            <Spreed orientation="horizontal" className="my-4" />

            <View className="flex lg:justify-start justify-between gap-3">
              <Button
                variant="ghost"
                className="font-semibold bg-[#F3E8FF] text-[#9333EA]"
                onClick={() => {
                  setId(items._id);
                  EditStatus.mutate({ statusPesanan: 'PROSES' });
                }}
              >
                Mulai Proses
              </Button>

              <Button
                variant="ghost"
                className="font-semibold bg-[#DCFCE7] text-[#2CAD5C]"
                onClick={() => {
                  setId(items._id);
                  EditStatus.mutate({ statusPesanan: 'SELESAI' });
                }}
              >
                Ditandai Selesai
              </Button>
            </View>
          </Container>
        );
      })}
    </View>
  );
};

export default PesananAktif;
