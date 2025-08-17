import View from './ui/view';
import { Text } from './ui/Text';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import Spreed from '../core/components/spreed';
import { Calendar, CircleCheckBig, Clock, CreditCard, Heart, History } from 'lucide-react';
import { useGetLayanan } from '../hooks/mutasion/layanan/useGetLayanan';
import { KucingType, LayananAppType, PesananAktifType } from '../types/components';
import { useGetCat } from '../hooks/mutasion/cat/useGetCat';
import { getTime } from '../utils/string.format';
import { getDate } from '../utils/string.format';
import { useEditPesanan } from '../hooks/mutasion/pesanan/useEdiStatus';
import { useEffect, useState } from 'react';
import { FormStatusPembayaranSchema, FormStatusPemesananaSchema } from '../types/form';
import { formatDate } from '../utils/string.format';
import { useAppSelector } from '../hooks/dispatch/dispatch';
import { useEditPembayaran } from '../hooks/mutasion/pesanan/useEditPembayaran';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useGetCatAll } from '../hooks/mutasion/cat/useGetCatAll';

interface Props {
  data: PesananAktifType[];
  type: 'Aktif' | 'Riwayat';
}

const Pesanan = ({ data, type }: Props) => {
  const curentRole = useAppSelector((state) => state.auth.currentUser?.user.role);
  const layananQuery = useGetLayanan();
  let catQuery;
  if (curentRole === 'ADMIN') {
    catQuery = useGetCatAll();
  } else {
    catQuery = useGetCat();
  }

  const layananList: LayananAppType[] = layananQuery.data || [];
  const catAll = (catQuery.data?.data ?? []) as KucingType[];
  const [isSelect, setIsSelect] = useState<'pay' | null>(null);
  const [idPesananKecil, setIdPesananKecil] = useState<string | null>(null);
  const [select, setSetSelect] = useState<'PENDING' | 'PROSES' | 'SELESAI'>('PENDING');
  const [id, setId] = useState<string | null>(null);
  const EditStatus = useEditPesanan(id || '');
  const [formEdit, setFormEdit] = useState<FormStatusPemesananaSchema>({
    statusPesanan: '',
  });

  const Pembayaran = useEditPembayaran(idPesananKecil!);
  const [formEditPembayaran, setFormPembayaran] = useState<FormStatusPembayaranSchema>({
    statusPembayaran: '',
  });

  const handlePembayaran = () => {
    Pembayaran.mutate(formEditPembayaran);
  };

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
      return (
        <Label className="p-1 rounded-sm lg:p-2 bg-[#FEE2E2] text-[#B91C1C]">Belum Lunas</Label>
      );
    } else if (text === 'PAID') {
      return <Label className="p-1 rounded-sm lg:p-2 bg-[#DCFCE7] text-[#2CAD5C]">Lunas</Label>;
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
        className={`flex justify-center scale-70 lg:scale-100 items-center gap-3 rounded-lg ${badge.bg} ${badge.text} p-2`}
      >
        {badge.icon}
        <Label className={`${badge.text}`}>{badge.label}</Label>
      </View>
    );
  };

  if (data.length === 0) {
    if (type === 'Aktif') {
      return (
        <View className="flex flex-col justify-center items-center mt-6 bg-[var(--shapeV2-parent)] rounded-lg p-6 gap-4">
          <Clock size={86} />
          <View className="flex flex-col justify-center items-center gap-2 text-center">
            <Text className="font-semibold text-lg">Tidak Ada Pesanan Aktif</Text>
            <Text className="font-light text-sm">
              Pesanan Anda akan muncul di sini setelah checkout
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View className="flex justify-center items-center flex-col mt-4 bg-[var(--shapeV2-parent)] rounded-lg p-4">
          <History size={86} />
          <View className="flex justify-center items-center flex-col">
            <Text className="font-semibold">Tidak Ada Riwayat</Text>
            <Text className="font-light">Pesanan Anda Akan Muncul Di Sini Setelah Selesai</Text>
          </View>
        </View>
      );
    }
  }

  return (
    <View className="w-full space-y-4">
      {data.map((order, orderIndex) => (
        <div
          key={orderIndex}
          className="space-y-4 p-4 rounded-lg border shadow bg-[var(--shapeV2-parent)]"
        >
          {order.items.map((item, itemIndex) => {
            const layanan =
              typeof item.layananId === 'string'
                ? layananList.find((l) => l._id === item.layananId)
                : (item.layananId as LayananAppType);

            const kucing =
              typeof item.kucingId === 'string'
                ? catAll.find((c) => c._id === item.kucingId)
                : (item.kucingId as KucingType);

            // Conditionally render based on the status and type
            const shouldRender =
              (type === 'Aktif' && ['PENDING', 'PROSES'].includes(item.statusPesanan)) ||
              (type === 'Riwayat' && item.statusPesanan === 'SELESAI');

            if (!shouldRender) {
              return null;
            }

            return (
              <div
                key={itemIndex}
                onClick={() => setIdPesananKecil(item._id)}
                className={`space-y-4 p-4 rounded-lg border shadow bg-[var(--shapeV2-parent)] `}
              >
                <View className="flex justify-between items-center">
                  <View className="flex justify-center items-center gap-6">
                    <Text className="font-bold text-2xl">{layanan?.namaLayanan}</Text>
                    {handleBagheStatus(item.statusPesanan)}
                  </View>
                  <Label className="font-bold text-sm lg:text-2xl">
                    Rp. {layanan?.harga.toLocaleString('id-ID')}
                  </Label>
                </View>

                <View className="flex justify-between items-center">
                  <Label className="font-light">Untuk Kucing: {kucing?.namaKucing}</Label>
                  <Label className="font-bold text-lg">{order.metodePembayaran}</Label>
                </View>

                <Label className="font-light text-lg">ID Pesanan: {item._id}</Label>

                <View className="grid grid-cols-2 gap-4 mt-4">
                  <View className="flex justify-start items-center gap-2">
                    <Calendar />
                    <Text className="text-sm lg:text-lg">Jadwal: {getDate(item.jadwal)}</Text>
                  </View>
                  <View className="flex justify-end items-center gap-2">
                    <CreditCard />
                    <Text className="text-sm lg:text-lg">
                      Status Pembayaran: {handleBaghe(item.statusPembayaran)}
                    </Text>
                  </View>
                  <View className="flex gap-2 items-center">
                    <Clock />
                    <Text className="text-sm lg:text-lg">
                      Estimasi Selesai: {getTime(item.jadwal)}
                    </Text>
                  </View>
                  <View className="flex justify-end gap-2">
                    <Text>Dipesan: {formatDate(item.createdAt)}</Text>
                  </View>
                </View>

                {curentRole === 'ADMIN' && <Spreed orientation="horizontal" className="my-4" />}

                {curentRole === 'ADMIN' && type === 'Aktif' && (
                  <View className="flex lg:justify-start justify-between gap-3">
                    {item.statusPembayaran === 'UNPAID' ? (
                      <View className="flex justify-center items-center gap-2">
                        {isSelect !== 'pay' || idPesananKecil !== item._id ? (
                          <Button onClick={() => setIsSelect('pay')}>Edit Status Pembayaran</Button>
                        ) : (
                          <>
                            <Select
                              onValueChange={(value) =>
                                setFormPembayaran((prev) => ({
                                  ...prev,
                                  statusPembayaran: value,
                                }))
                              }
                            >
                              <SelectTrigger className="w-[180px] mt-2">
                                <SelectValue placeholder="Pilih status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PAID">Lunas</SelectItem>
                                <SelectItem value="UNPAID">Belum Lunas</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button className="mt-2" onClick={handlePembayaran}>
                              Simpan
                            </Button>
                          </>
                        )}
                      </View>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="font-semibold bg-[#F3E8FF] text-[#9333EA]"
                          onClick={() => {
                            setId(item._id);
                            EditStatus.mutate({ statusPesanan: 'PROSES' });
                          }}
                        >
                          Mulai Proses
                        </Button>
                        <Button
                          variant="ghost"
                          className="font-semibold bg-[#DCFCE7] text-[#2CAD5C]"
                          onClick={() => {
                            setId(item._id);
                            EditStatus.mutate({ statusPesanan: 'SELESAI' });
                          }}
                        >
                          Ditandai Selesai
                        </Button>
                      </>
                    )}
                  </View>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </View>
  );
};

export default Pesanan;
