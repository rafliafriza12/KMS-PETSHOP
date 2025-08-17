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

            {hasCats && (
              <Button className="font-semibold" onClick={() => setIsPopUp('kucing')}>
                <View className="flex items-center gap-2">
                  <Plus className="text-foreground" />
                  <Text>Tambah Kucing</Text>
                </View>
              </Button>
            )}
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
    </HomeUserLayout>
  );
};

export default DashboardUserContainer;
