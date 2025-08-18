'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeUserLayout from '@/app/core/layout/home-user';
import { Button } from '@/app/components/ui/button';
import { Cat, Plus } from 'lucide-react';
import { useState } from 'react';
import PopUp from '@/app/core/components/pop-up';
import { PenyakitKucing } from '@/app/core/constants/penyakit';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { RasKucing } from '@/app/core/constants/ras';
import { ChevronRight } from 'lucide-react';
import Spreed from '@/app/core/components/spreed';
import Informasion from '@/app/components/informasion';
import { FormBikinKucingSchema } from '@/app/types/form';
import { useCreateCat } from '@/app/hooks/mutasion/cat/useCreateCat';
import Fallback from '@/app/components/ui/fallback';
import { useAlert } from '@/app/hooks/alert/costum-alert';
import { useGetCat } from '@/app/hooks/mutasion/cat/useGetCat';
import { useAppDispatch, useAppSelector } from '@/app/hooks/dispatch/dispatch';
import { setSelectedCat } from '@/app/store/CatSlice/catSlice';
import { useDeleteCat } from '@/app/hooks/mutasion/cat/useDeleteCat';
import Kucing from '@/app/components/diagnosis';
import EmptyKucing from '@/app/components/fallbackcat';

const DashboardUserContainer = () => {
  const [isPopUp, setIsPopUp] = useState<'kucing' | null>(null);
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const curenttName = useAppSelector((state) => state.cat);
  const { data } = useGetCat();
  const [selectId, setSelectId] = useState<string | null>(null);

  const initialForm: FormBikinKucingSchema = {
    namaKucing: '',
    ras: '',
    tingkatAktivitas: '',
    umur: null,
    berat: null,
    kondisiKesehatan: [],
  };

  const [formBikinKucing, setFormBikinKucing] = useState<FormBikinKucingSchema>(initialForm);

  const CreateCat = useCreateCat({
    onAfterSuccess: () => {
      setFormBikinKucing(initialForm);
      setIsPopUp(null);
    },
  });

  const handleCreateCat = () => {
    if (
      !formBikinKucing.namaKucing ||
      !formBikinKucing.ras ||
      !formBikinKucing.berat ||
      !formBikinKucing.tingkatAktivitas ||
      !formBikinKucing.umur
    ) {
      alert.toast({
        title: 'Perhatian!',
        message: 'Mohon mengisi semua kolom',
        icon: 'warning',
      });
      return;
    }
    CreateCat.mutate(formBikinKucing);
  };

  const DeleteCat = useDeleteCat({
    onAfterSuccess: () => {
      console.log('Kucing berhasil dihapus');
    },
  });

  const handleDeleteCat = (id: string) => {
    DeleteCat.mutate(id);
  };

  const aktivitas = [
    { label: 'Rendah', desc: 'Suka tidur, jarang main' },
    { label: 'Sedang', desc: 'Bermain sesekali' },
    { label: 'Tinggi', desc: 'Sangat aktif, suka bermain' },
  ];

  const hasCats = data?.data && data.data.length > 0;

  return (
    <HomeUserLayout>
      <Container as="main" className="w-full h-full">
        <View className="flex flex-col items-center w-full">
          <View className="flex justify-between items-center w-full p-4">
            <View className="flex flex-col">
              <Text className="font-bold text-2xl lg:text-4xl">Dashboard</Text>
              <Text className="font-semibold text-sm">
                Kelola profil kucing Anda dan dapatkan rekomendasi perawatan
              </Text>
            </View>

            <Button className="font-semibold" onClick={() => setIsPopUp('kucing')}>
              <View className="flex items-center gap-2">
                <Plus className="text-foreground" />
                <Text>Tambah Kucing</Text>
              </View>
            </Button>
          </View>

          <Spreed orientation="horizontal" className="mt-2" />

          {hasCats ? (
            <Container className="w-full h-full">
              <View className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                {data.data.map((items: any, key: any) => {
                  const id = (items._id ?? items.nama ?? key).toString();
                  return (
                    <div
                      key={id}
                      onClick={() => {
                        setSelectId((prev) => (prev === id ? null : id));
                        dispatch(setSelectedCat(items));
                      }}
                      className="cursor-pointer"
                    >
                      <Kucing
                        onDelete={() => handleDeleteCat(id)}
                        data={items}
                        isSelect={selectId === id}
                      />
                    </div>
                  );
                })}
              </View>

              {selectId && (
                <View className="p-4 w-full">
                  <Informasion catName={curenttName.selectedCat?.namaKucing} isSelect={true} />
                </View>
              )}
            </Container>
          ) : (
            <EmptyKucing />
          )}
        </View>
      </Container>
      <PopUp isOpen={isPopUp === 'kucing'} onClose={() => setIsPopUp(null)}>
        <Container className="w-full p-6 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced">
          <View className="space-y-6">
            <View className="flex justify-between items-center gap-4">
              <View className="flex items-center gap-3">
                <Plus className="text-primary w-6 h-6 " />
                <Text className="text-xl font-bold text-gradient-primary">
                  Tambah Profile Kucing
                </Text>
              </View>
              <ChevronRight
                className="text-primary w-6 h-6 cursor-pointer  transition-all duration-300 "
                onClick={() => setIsPopUp(null)}
              />
            </View>

            <Container className="w-full">
              <View className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <View className="w-full space-y-2">
                  <Text className="text-base font-semibold text-gradient-neutral">
                    Nama Kucing :
                  </Text>
                  <Input
                    placeholder="Contoh : Whiskers"
                    value={formBikinKucing.namaKucing}
                    onChange={(e) =>
                      setFormBikinKucing((prev) => ({
                        ...prev,
                        namaKucing: e.target.value,
                      }))
                    }
                    className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift h-full transition-all duration-300 animate-glow backdrop-blur-enhanced"
                  />
                </View>

                <View className="w-full space-y-2">
                  <Text className="text-base font-semibold text-gradient-neutral">
                    Ras Kucing :
                  </Text>
                  <Select
                    onValueChange={(value) =>
                      setFormBikinKucing((prev) => ({ ...prev, ras: value }))
                    }
                  >
                    <SelectTrigger className="w-full card-glass rounded-lg p-3 bg-gradient-primary/20 border-gray-200/50 hover-lift h-full transition-all duration-300 animate-glow backdrop-blur-enhanced">
                      <SelectValue placeholder="Pilih Ras" />
                    </SelectTrigger>
                    <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
                      {RasKucing.map((ras) => (
                        <SelectItem key={ras} value={ras}>
                          {ras}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </View>
              </View>
            </Container>

            <Container className="w-full">
              <View className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <View className="w-full space-y-2">
                  <Text className="text-base font-semibold text-gradient-neutral">
                    Umur (tahun) :
                  </Text>
                  <Input
                    placeholder="Contoh : 1"
                    type="number"
                    inputMode="numeric"
                    value={formBikinKucing.umur ?? ''}
                    onChange={(e) =>
                      setFormBikinKucing((prev) => ({
                        ...prev,
                        umur: e.target.value === '' ? null : Number(e.target.value),
                      }))
                    }
                    className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift h-full transition-all duration-300 animate-glow backdrop-blur-enhanced"
                  />
                </View>

                <View className="w-full space-y-2">
                  <Text className="text-base font-semibold text-gradient-neutral">
                    Berat (kg) :
                  </Text>
                  <Input
                    placeholder="Contoh : 2"
                    type="number"
                    inputMode="numeric"
                    value={formBikinKucing.berat ?? ''}
                    onChange={(e) =>
                      setFormBikinKucing((prev) => ({
                        ...prev,
                        berat: e.target.value === '' ? null : Number(e.target.value),
                      }))
                    }
                    className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift h-full transition-all duration-300 animate-glow backdrop-blur-enhanced"
                  />
                </View>
              </View>
            </Container>

            <Container className="w-full">
              <Text className="text-base font-semibold text-gradient-neutral">
                Tingkat Aktivitas
              </Text>
              <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                {aktivitas.map((item) => (
                  <div
                    key={item.label}
                    onClick={() =>
                      setFormBikinKucing((prev) => ({
                        ...prev,
                        tingkatAktivitas: item.label,
                      }))
                    }
                    className={` w-full rounded-xl p-4 cursor-pointer transition-all duration-300 hover-lift h-full card-glass shadow-enhanced animate-glow backdrop-blur-enhanced ${
                      formBikinKucing.tingkatAktivitas === item.label
                        ? 'gradient-primary/20 border-primary'
                        : 'border-[var(--shapeV1-parent)]/50 bg-[var(--shapeV2-parent)]/50'
                    }`}
                  >
                    <View className="flex justify-center items-center flex-col gap-2">
                      <Text
                        className={`text-base font-semibold ${
                          formBikinKucing.tingkatAktivitas === item.label
                            ? 'text-gradient-primary'
                            : 'text-foreground'
                        }`}
                      >
                        {item.label}
                      </Text>
                      <Text className="text-sm text-center text-muted-foreground">{item.desc}</Text>
                    </View>
                  </div>
                ))}
              </View>
            </Container>

            <Container className="w-full">
              <Text className="text-base font-semibold text-gradient-neutral">
                Kondisi Kesehatan (opsional)
              </Text>
              <View className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                {PenyakitKucing.map((item) => {
                  const checked = formBikinKucing.kondisiKesehatan.includes(item);
                  return (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer h-full transition-all duration-300 animate-glow"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={checked}
                        onChange={(e) => {
                          setFormBikinKucing((prev) => {
                            let updated = [...prev.kondisiKesehatan];
                            if (e.target.checked) {
                              updated.push(item);
                            } else {
                              updated = updated.filter((val) => val !== item);
                            }
                            return { ...prev, kondisiKesehatan: updated };
                          });
                        }}
                        className="w-5 h-5 text-primary  focus:ring-primary animate-glow"
                      />
                      <span className="text-foreground text-sm">{item}</span>
                    </label>
                  );
                })}
              </View>
            </Container>

            <View className="mt-6">
              <Button
                className="w-full gradient-primary text-primary-foreground px-6 py-3 rounded-full hover-lift hover:opacity-90 transition-all duration-300 animate-glow font-semibold"
                onClick={() => handleCreateCat()}
                disabled={CreateCat.isPending}
              >
                {CreateCat.isPending ? (
                  <Fallback title="Tunggu Sebentar" />
                ) : (
                  <>
                    <Cat className="w-5 h-5 mr-2 " />
                    Kirim
                  </>
                )}
              </Button>
            </View>
          </View>
        </Container>
      </PopUp>
    </HomeUserLayout>
  );
};

export default DashboardUserContainer;
