import View from './ui/view';
import { Text } from './ui/Text';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import Spreed from '../core/components/spreed';
import {
  Calendar,
  CheckCircle,
  CircleCheckBig,
  Clock,
  CreditCard,
  Edit3,
  Heart,
  Play,
  Save,
} from 'lucide-react';
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
  data: PesananAktifType;
  tabActive: 'Aktif' | 'Riwayat';
}
const PesananAktif = ({ data, tabActive }: Props) => {
  console.log('Pesanan Aktif Data:', data);
  const curentRole = useAppSelector((state) => state.auth.currentUser?.user.role);
  const layananQuery = useGetLayanan();
  let catQuery;
  if (curentRole === 'ADMIN') {
    catQuery = useGetCatAll();
  } else {
    catQuery = useGetCat();
  }

  // Ilmu
  const layananList: LayananAppType[] = layananQuery.data || [];
  // Ilmu
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
        <Label className="p-2  rounded-lg bg-red-500 gradient-warning text-warning text-sm font-semibold animate-glow hover-lift hover:scale-105 transition-all duration-300">
          Belum Lunas
        </Label>
      );
    } else if (text === 'PAID') {
      return (
        <Label className="p-2 rounded-lg bg-green-500 gradient-success text-success text-sm font-semibold animate-glow hover-lift hover:scale-105 transition-all duration-300">
          Lunas
        </Label>
      );
    }
    return (
      <Label className="p-2 rounded-lg gradient-neutral text-foreground text-sm font-semibold animate-glow hover-lift hover:scale-105 transition-all duration-300">
        Unknown
      </Label>
    );
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
    <View className="w-full p-6 space-y-6">
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

        return ['PENDING', 'PROSES'].includes(items.statusPesanan) && tabActive === 'Aktif' ? (
          <div
            onClick={() => {
              setIdPesananKecil(items._id);
            }}
            key={index}
            className={`space-y-4 p-6 card-glass rounded-xl shadow-enhanced animate-glow  backdrop-blur-enhanced hover-lift hover:scale-[1.01] transition-all duration-300 ${
              idPesananKecil === items._id
                ? 'gradient-primary/30 border-primary'
                : 'border-gray-200/50'
            }`}
          >
            <View className="flex justify-between items-center">
              <View className="flex justify-center items-center gap-6">
                <Text className="font-bold text-2xl text-gradient-primary">
                  {layanan?.namaLayanan}
                </Text>
                {handleBagheStatus(items.statusPesanan)}
              </View>
              <Label className="font-bold text-lg lg:text-2xl text-gradient-primary">
                Rp. {layanan?.harga.toLocaleString('id-ID')}
              </Label>
            </View>

            <View className="flex justify-between items-center">
              <Label className="font-light text-gradient-neutral">
                Untuk Kucing: {kucing?.namaKucing}
              </Label>
              <Label className="font-bold text-lg text-gradient-primary">
                {data.metodePembayaran}
              </Label>
            </View>

            <Label className="font-light text-lg text-gradient-neutral">
              ID Pesanan: {items._id}
            </Label>

            <View className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <View className="flex justify-start items-center gap-2">
                <Calendar className="text-primary w-5 h-5 " />
                <Text className="text-sm lg:text-base text-foreground">
                  Jadwal: {getDate(items.jadwal)}
                </Text>
              </View>
              <View className="flex justify-end items-center gap-2">
                <CreditCard className="text-primary w-5 h-5 " />
                <Text className="text-sm lg:text-base text-foreground">
                  Status Pembayaran: {handleBaghe(items.statusPembayaran)}
                </Text>
              </View>
              <View className="flex gap-2 items-center">
                <Clock className="text-primary w-5 h-5 " />
                <Text className="text-sm lg:text-base text-foreground">
                  Estimasi Selesai: {getTime(items.jadwal)}
                </Text>
              </View>
              <View className="flex justify-end gap-2">
                <Text className="text-sm lg:text-base text-foreground">
                  Dipesan: {formatDate(items.createdAt)}
                </Text>
              </View>
            </View>

            <Spreed orientation="horizontal" className="my-4 border-gray-200/50 animate-glow" />

            {curentRole === 'ADMIN' && (
              <View className="flex lg:justify-start justify-between gap-3 w-full ">
                {items.statusPembayaran === 'UNPAID' ? (
                  <View className="flex justify-center items-center gap-2">
                    {isSelect !== 'pay' ? (
                      <Button
                        className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift  transition-all duration-300 animate-glow"
                        onClick={() => setIsSelect('pay')}
                      >
                        <Edit3 className="w-4 h-4 mr-2 " />
                        Edit Status Pembayaran
                      </Button>
                    ) : (
                      <View className="flex gap-2 items-center flex-wrap lg:flex-nowrap  w-full max-w-100 ">
                        <Select
                          onValueChange={(value) =>
                            setFormPembayaran((prev) => ({
                              ...prev,
                              statusPembayaran: value,
                            }))
                          }
                        >
                          <SelectTrigger className="card-glass rounded-lg p-3 bg-gradient-primary/20 border-gray-200/50 hover-lift  transition-all duration-300 animate-glow backdrop-blur-enhanced">
                            <SelectValue placeholder="Pilih " className="w-auto lg:w-1/2" />
                          </SelectTrigger>
                          <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
                            <SelectItem value="PAID">Lunas</SelectItem>
                            <SelectItem value="UNPAID">Belum Lunas</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          className="gradient-primary text-primary-foreground px-4 py-2 lg:w-1/2 w-auto rounded-full hover-lift   transition-all duration-300 animate-glow"
                          onClick={() => handlePembayaran()}
                        >
                          <Save className="w-4 h-4 mr-2 " />
                          Simpan
                        </Button>
                      </View>
                    )}
                  </View>
                ) : (
                  <>
                    <Button
                      className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift  transition-all duration-300 animate-glow"
                      onClick={() => {
                        setId(items._id);
                        EditStatus.mutate({ statusPesanan: 'PROSES' });
                      }}
                    >
                      <Play className="w-4 h-4 mr-2 " />
                      Mulai Proses
                    </Button>
                    <Button
                      className="gradient-success text-success-foreground px-4 py-2 rounded-full hover-lift  transition-all duration-300 animate-glow"
                      onClick={() => {
                        setId(items._id);
                        EditStatus.mutate({ statusPesanan: 'SELESAI' });
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2 " />
                      Ditandai Selesai
                    </Button>
                  </>
                )}
              </View>
            )}
          </div>
        ) : !['PENDING', 'PROSES'].includes(items.statusPesanan) && tabActive === 'Riwayat' ? (
          <div
            onClick={() => {
              setIdPesananKecil(items._id);
            }}
            key={index}
            className={`space-y-4 p-6 card-glass rounded-xl shadow-enhanced animate-glow backdrop-blur-enhanced hover-lift hover:scale-[1.01] transition-all duration-300 ${
              idPesananKecil === items._id
                ? 'gradient-primary/30 border-primary'
                : 'border-gray-200/50'
            }`}
          >
            <View className="flex justify-between items-center w-full">
              <View className="flex justify-start items-center gap-6 ">
                <Text className="font-bold text-sm lg:text-2xl text-gradient-primary ">
                  {layanan?.namaLayanan}
                </Text>
                {handleBagheStatus(items.statusPesanan)}
              </View>
              <Label className="font-bold text-sm lg:text-2xl text-gradient-primary">
                Rp. {layanan?.harga.toLocaleString('id-ID')}
              </Label>
            </View>

            <View className="flex justify-between  items-center">
              <Label className="font-light text-gradient-neutral">
                Untuk Kucing: {kucing?.namaKucing}
              </Label>
              <Label className="font-bold text-lg text-gradient-primary">
                {data.metodePembayaran}
              </Label>
            </View>

            <Label className="font-light text-lg text-gradient-neutral">
              ID Pesanan: {items._id}
            </Label>

            <View className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <View className="flex justify-start items-center gap-2">
                <Calendar className="text-primary w-5 h-5 " />
                <Text className="text-sm lg:text-base text-foreground">
                  Jadwal: {getDate(items.jadwal)}
                </Text>
              </View>
              <View className="flex justify-end items-center gap-2">
                <CreditCard className="text-primary w-5 h-5 " />
                <Text className="text-sm lg:text-base text-foreground">
                  Status Pembayaran: {handleBaghe(items.statusPembayaran)}
                </Text>
              </View>
              <View className="flex gap-2 items-center">
                <Clock className="text-primary w-5 h-5 " />
                <Text className="text-sm lg:text-base text-foreground">
                  Estimasi Selesai: {getTime(items.jadwal)}
                </Text>
              </View>
              <View className="flex justify-end gap-2">
                <Text className="text-sm lg:text-base text-foreground">
                  Dipesan: {formatDate(items.createdAt)}
                </Text>
              </View>
            </View>

            <Spreed orientation="horizontal" className="my-4 border-gray-200/50 animate-glow" />

            {curentRole === 'ADMIN' && (
              <View className="flex lg:justify-start justify-between gap-3">
                {items.statusPembayaran === 'UNPAID' ? (
                  <View className="flex justify-center items-center gap-2">
                    {isSelect !== 'pay' ? (
                      <Button
                        className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift transition-all duration-300 animate-glow"
                        onClick={() => setIsSelect('pay')}
                      >
                        <Edit3 className="w-4 h-4 mr-2 " />
                        Edit Status Pembayaran
                      </Button>
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
                          <SelectTrigger className="w-[180px] card-glass rounded-lg p-3 bg-gradient-primary/20 border-gray-200/50 hover-lift transition-all duration-300 animate-glow backdrop-blur-enhanced">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
                            <SelectItem value="PAID">Lunas</SelectItem>
                            <SelectItem value="UNPAID">Belum Lunas</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift transition-all duration-300 animate-glow"
                          onClick={() => handlePembayaran()}
                        >
                          <Save className="w-4 h-4 mr-2 " />
                          Simpan
                        </Button>
                      </>
                    )}
                  </View>
                ) : (
                  <View>
                    {items.statusPesanan === 'SELESAI' ? null : (
                      <>
                        <Button
                          className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift transition-all duration-300 animate-glow"
                          onClick={() => {
                            setId(items._id);
                            EditStatus.mutate({ statusPesanan: 'PROSES' });
                          }}
                        >
                          <Play className="w-4 h-4 mr-2 " />
                          Mulai Proses
                        </Button>
                        <Button
                          className="gradient-success text-success-foreground px-4 py-2 rounded-full hover-lift transition-all duration-300 animate-glow"
                          onClick={() => {
                            setId(items._id);
                            EditStatus.mutate({ statusPesanan: 'SELESAI' });
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-2 " />
                          Ditandai Selesai
                        </Button>
                      </>
                    )}
                  </View>
                )}
              </View>
            )}
          </div>
        ) : null;
      })}
    </View>
  );
};

export default PesananAktif;
