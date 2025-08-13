'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeUserLayout from '@/app/core/layout/home-user';
import { Button } from '@/app/components/ui/button';
import { Plus } from 'lucide-react';
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
import { useAppDispatch } from '@/app/hooks/dispatch/dispatch';
import { useAppSelector } from '@/app/hooks/dispatch/dispatch';
import { setSelectedCat } from '@/app/store/CatSlice/catSlice';
import { useDeleteCat } from '@/app/hooks/mutasion/cat/useDeleteCat';
import Kucing from '@/app/components/diagnosis';

const DashboardUserContainer = () => {
  const [isPopUp, setIsPopUp] = useState<'kucing' | null>(null);
  const [state, setState] = useState<'Rendah' | 'Sedang' | 'Tinggi' | null>(null);
  const alert = useAlert();
  const curenttName = useAppSelector((state) => state.cat);
  const dispatch = useAppDispatch();
  const [selectId, setSelectId] = useState<string | null>(null);
  const [formBikinKucing, setFormBikinKucing] = useState<FormBikinKucingSchema>({
    namaKucing: '',
    ras: '',
    tingkatAktivitas: '',
    umur: null,
    berat: null,
    kondisiKesehatan: [],
  });

  const { data } = useGetCat();
  const DeleteCat = useDeleteCat({
    onAfterSuccess: () => {
      console.log('Kucing berhasil dihapus');
    },
  });

  const handleDeleteCat = (id: string) => {
    DeleteCat.mutate(id);
  };
  const initialForm: FormBikinKucingSchema = {
    namaKucing: '',
    ras: '',
    tingkatAktivitas: '',
    umur: null,
    berat: null,
    kondisiKesehatan: [],
  };
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
        title: 'Perhatian !',
        message: 'Mohon Mengisi Semua Colum',
        icon: 'warning',
      });
      return;
    }
    return CreateCat.mutate(formBikinKucing);
  };
  const aktivitas: { label: 'Rendah' | 'Sedang' | 'Tinggi'; desc: string }[] = [
    { label: 'Rendah', desc: 'Suka Tidur, Jarang Main' },
    { label: 'Sedang', desc: 'Bermain Sesekali' },
    { label: 'Tinggi', desc: 'Sangat Aktif, Suka Bermain' },
  ];
  return (
    <HomeUserLayout>
      <Container as="main" className="w-full h-full">
        <View className="flex justify-center items-center flex-col">
          <View className="flex justify-between items-center w-full p-4">
            <View className="flex justify-center items-start flex-col">
              <Text className="font-bold text-2xl lg:text-4xl">Dashboard</Text>
              <Text className="font-semibold text-sm">
                Kelola profil kucing Anda dan dapatkan rekomendasi perawatan
              </Text>
            </View>
            <Button className="font-semibold" onClick={() => setIsPopUp('kucing')}>
              <View className="flex items-center justify-center gap-2">
                <Plus className="text-foreground" />
                <Text>Tambah Kucing</Text>
              </View>
            </Button>
            <PopUp isOpen={isPopUp === 'kucing'} onClose={() => setIsPopUp(null)}>
              <Container className="w-full h-full">
                <View className="flex justify-between items-center gap-2">
                  <View className="flex">
                    <Plus className="text-foreground" />
                    <Text className="font-bold">Tambah Profile Kucing</Text>
                  </View>
                  <ChevronRight
                    className="text-foreground cursor-pointer"
                    onClick={() => setIsPopUp(null)}
                  />
                </View>

                <Container className="w-full mt-4">
                  <View className="flex justify-between items-center gap-4">
                    <View className="w-full gap-2">
                      <Text className="font-semibold">Nama Kucing :</Text>
                      <Input
                        placeholder="Contoh : Whiskers"
                        value={formBikinKucing.namaKucing}
                        onChange={(e) =>
                          setFormBikinKucing((prev) => ({
                            ...prev,
                            namaKucing: e.target.value,
                          }))
                        }
                      />
                    </View>

                    <View className="flex justify-center items-center w-full flex-col gap-2">
                      <View className="w-full ">
                        <Text className="font-semibold">Ras Kucing :</Text>
                        <Select
                          onValueChange={(value) =>
                            setFormBikinKucing((prev) => ({ ...prev, ras: value }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Ras" />
                          </SelectTrigger>
                          <SelectContent>
                            {RasKucing.map((ras) => (
                              <SelectItem key={ras} value={ras}>
                                {ras}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </View>
                    </View>
                  </View>
                </Container>

                <Container className="w-full mt-4">
                  <View className="flex justify-between items-center gap-4">
                    <View className="w-full ">
                      <Text className="font-semibold">Umur (tahun) :</Text>
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
                      />
                    </View>

                    <View className="flex justify-center items-center w-full flex-col gap-2">
                      <View className="w-full gap-2">
                        <Text className="font-semibold">Berat (kg) :</Text>
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
                        />
                      </View>
                    </View>
                  </View>
                </Container>

                <Container className="w-full mt-2 ">
                  <Text className="font-semibold">Tingkat Aktivitas</Text>
                  <View className="flex justify-between items-center gap-4">
                    {aktivitas.map((item) => (
                      <div
                        key={item.label}
                        onClick={() =>
                          setFormBikinKucing((prev) => ({
                            ...prev,
                            tingkatAktivitas: item.label,
                          }))
                        }
                        className={`h-auto w-auto rounded-lg border p-4 lg:p-3 cursor-pointer transition ${
                          formBikinKucing.tingkatAktivitas === item.label
                            ? 'border-primary bg-primary/10'
                            : 'border-[var(--shapeV1-parent)]'
                        }`}
                      >
                        <View className="flex justify-center items-center flex-col">
                          <Text
                            className={`text-sm lg:text-lg font-semibold ${
                              formBikinKucing.tingkatAktivitas === item.label ? 'text-primary' : ''
                            }`}
                          >
                            {item.label}
                          </Text>
                          <Text className="text-center lg:text-sm">{item.desc}</Text>
                        </View>
                      </div>
                    ))}
                  </View>
                </Container>

                <Container className="w-full mt-2">
                  <Text className="font-semibold">Kondisi Kesehatan (opsional)</Text>
                  <View className="grid grid-cols-3 gap-2 mt-2">
                    {PenyakitKucing.map((item) => {
                      const checked = formBikinKucing.kondisiKesehatan.includes(item);
                      return (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
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
                            className="w-4 h-4"
                          />
                          <span>{item}</span>
                        </label>
                      );
                    })}
                  </View>
                </Container>

                <View className="mt-4">
                  <Button
                    className="w-full"
                    onClick={() => handleCreateCat()}
                    disabled={CreateCat.isPending}
                  >
                    {CreateCat.isPending ? <Fallback title="Tunggu Sebentar" /> : 'Kirim'}
                  </Button>
                </View>
              </Container>
            </PopUp>
          </View>
          <Spreed orientation="horizontal" className="mt-2" />

          <Container className="w-full h-full">
            <View className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
              {(data?.data ?? []).map((items: any, key: any) => {
                const id = (items._id ?? items.nama ?? key).toString();
                return (
                  <div
                    key={id}
                    onClick={() => {
                      if (id === selectId) {
                        setSelectId(null);
                        dispatch(setSelectedCat(items));
                      } else {
                        setSelectId(id);
                        dispatch(setSelectedCat(items));
                      }
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
            <View className=" p-4">
              {selectId && (
                <Informasion catName={curenttName.selectedCat?.namaKucing} isSelect={true} />
              )}
            </View>
          </Container>
        </View>
      </Container>
    </HomeUserLayout>
  );
};

export default DashboardUserContainer;
