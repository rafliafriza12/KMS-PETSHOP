'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import PopUp from '@/app/core/components/pop-up';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { RasKucing } from '@/app/core/constants/ras';
import { ChevronRight, Plus } from 'lucide-react';
import Spreed from '@/app/core/components/spreed';
import { PenyakitKucing } from '@/app/core/constants/penyakit';
import Informasion from '@/app/components/informasion';

const DashboardAdminContainer = () => {
  const [isPopUp, setIsPopUp] = useState<'kucing' | null>(null);
  const [state, setState] = useState<'Rendah' | 'Sedang' | 'Tinggi' | null>(null);
  const [selectId, setSelectId] = useState<string | null>(null);

  const aktivitas: { label: 'Rendah' | 'Sedang' | 'Tinggi'; desc: string }[] = [
    { label: 'Rendah', desc: 'Suka Tidur, Jarang Main' },
    { label: 'Sedang', desc: 'Bermain Sesekali' },
    { label: 'Tinggi', desc: 'Sangat Aktif, Suka Bermain' },
  ];
  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full">
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
                        <Input placeholder="Contoh : Whiskers" />
                      </View>

                      <View className="flex justify-center items-center w-full flex-col gap-2">
                        <View className="w-full ">
                          <Text className="font-semibold text">Ras Kucing :</Text>
                          <Select>
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
                        <Input placeholder="Contoh : 1" type="text" inputMode="numeric" />
                      </View>

                      <View className="flex justify-center items-center w-full flex-col gap-2">
                        <View className="w-full gap-2">
                          <Text className="font-semibold">Berat (kg) :</Text>
                          <Input placeholder="Contoh : 2" type="text" inputMode="numeric" />
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
                          onClick={() => setState(item.label)}
                          className={` h-auto w-auto rounded-lg border p-4 lg:p-3 cursor-pointer transition ${
                            state === item.label
                              ? 'border-primary bg-primary/10'
                              : 'border-[var(--shapeV1-parent)]'
                          }`}
                        >
                          <View className="flex justify-center items-center flex-col">
                            <Text
                              className={`text-sm lg:text-lg font-semibold ${
                                state === item.label ? 'text-primary' : ''
                              }`}
                            >
                              {item.label}
                            </Text>
                            <Text className="text-center  lg:text-sm">{item.desc}</Text>
                          </View>
                        </div>
                      ))}
                    </View>
                  </Container>

                  <Container className="w-full mt-2">
                    <Text className="font-semibold">Kondisi Kesehatan (opsional)</Text>
                    <View className="grid grid-cols-3 gap-2 mt-2">
                      {PenyakitKucing.map((item) => (
                        <Text key={item} className="flex items-center gap-2">
                          <input type="checkbox" value={item} className="w-4 h-4" />
                          <span>{item}</span>
                        </Text>
                      ))}
                    </View>
                  </Container>
                  <View className="mt-4">
                    <Button className="w-full">Kirim</Button>
                  </View>
                </Container>
              </PopUp>
            </View>
            <Spreed orientation="horizontal" className="mt-2" />

            <Container className="w-full h-full">
              {/* <View className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                {DiagnosisAppData.map((items, key) => {
                  const id = (items._id ?? items._id ?? items.namaKucing ?? key).toString();
                  return (
                    <div
                      key={id}
                      onClick={() => setSelectId(id === selectId ? null : id)}
                      className="cursor-pointer"
                    >
                      <Diagnosis data={items} isSelect={selectId === id} />
                    </div>
                  );
                })}
              </View> */}
              <View className=" p-4">{selectId && <Informasion isSelect={true} />}</View>
            </Container>
          </View>
        </Container>
      </Container>
    </HomeAdminLayout>
  );
};
export default DashboardAdminContainer;
