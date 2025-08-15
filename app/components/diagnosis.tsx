import View from './ui/view';
import { Cat, Calendar, Weight, Activity, Heart, Trash } from 'lucide-react';
import { Text } from './ui/Text';
import Container from './ui/container';
import Spreed from '@/app/core/components/spreed';
import { DiagnosisAppTypeProps } from '../types/props';
import { Button } from './ui/button';
import UseTooltip from '../hooks/tooltip/tooltip/tooltip';
import { useAlert } from '../hooks/alert/costum-alert';
import { FormBikinKucingSchema } from '../types/form';
import PopUp from '../core/components/pop-up';
import { Input } from './ui/input';
import { PenyakitKucing } from '../core/constants/penyakit';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import Fallback from './ui/fallback';
import { RasKucing } from '../core/constants/ras';
import { useState } from 'react';
import { useEditCat } from '../hooks/mutasion/cat/useEditChat';
import { flattenToFormData } from '../utils/formdata';
const Kucing: React.FC<
  DiagnosisAppTypeProps & { isSelect: boolean } & { onDelete?: (_id: string) => void } & {
    isPending?: boolean;
  }
> = ({ data, isSelect, onDelete, isPending }) => {
  const alert = useAlert();
  const [isModal, setIsModal] = useState<'edit' | null>(null);

  const [formEditKucing, setFormEditKucing] = useState<FormBikinKucingSchema>({
    namaKucing: '',
    ras: '',
    tingkatAktivitas: '',
    umur: null,
    berat: null,
    kondisiKesehatan: [],
  });

  const editCat = useEditCat(data._id, {
    onAfterSuccess: () => {
      setIsModal(null);
    },
  });

  const handleEditCat = () => {
    const payload = Object.fromEntries(
      Object.entries(formEditKucing).filter(([_, v]) => v !== '' && v !== null)
    );
    return editCat.mutate(payload);
  };
  const handleBaghe = (text: string) => {
    if (text === 'Rendah') {
      return (
        <div className="text-sm font-light px-2 py-1 bg-[#DBEAFE] text-[#3740AF] rounded-lg">
          Rendah
        </div>
      );
    } else if (text === 'Sedang') {
      return (
        <div className="text-sm font-light px-2 py-1 bg-[#FEF9C3] text-[#AC551D] rounded-lg">
          Sedang
        </div>
      );
    } else if (text === 'Tinggi') {
      return (
        <div className="text-sm font-light px-2 py-1 bg-[#FEE2E2] text-[#991B1B] rounded-lg">
          Tinggi
        </div>
      );
    }
    return null;
  };
  const aktivitas: { label: 'Rendah' | 'Sedang' | 'Tinggi'; desc: string }[] = [
    { label: 'Rendah', desc: 'Suka Tidur, Jarang Main' },
    { label: 'Sedang', desc: 'Bermain Sesekali' },
    { label: 'Tinggi', desc: 'Sangat Aktif, Suka Bermain' },
  ];

  return (
    <View
      className={`flex flex-col border rounded-xl ${
        isSelect ? 'border-[var(--shapeV1-parent)]' : 'border border-white/50'
      }`}
    >
      <View className="flex justify-between items-center w-full p-3 border-b">
        <View className="flex items-center gap-3">
          <View className="rounded-full bg-[var(--shapeV1-parent)] p-2 z-0">
            <Cat className=" w-5 h-5 z-1" />
          </View>
          <View className="flex flex-col">
            <Text className="text-sm font-semibold">{data?.namaKucing}</Text>
            <Text className="text-sm font-semibold">{data?.ras}</Text>
          </View>
        </View>
        {isSelect ? (
          <View>
            <Text className="text-xs font-medium p-2 bg-[var(--shapeV1-parent)] rounded-lg">
              Dipilih
            </Text>
          </View>
        ) : null}
      </View>

      <Container className="p-3 w-full">
        <View className="flex justify-between items-center w-full">
          <View className="flex items-center gap-1">
            <Calendar className="w-4 h-4 " />
            <Text className="text-sm font-light">{data?.umur} Tahun</Text>
          </View>
          <View className="flex items-center gap-1">
            <Weight className="w-4 h-4 " />
            <Text className="text-sm font-light">{data?.berat} Kg</Text>
          </View>
        </View>

        <View className="flex justify-between items-center mt-4 w-full">
          <View className="flex items-center gap-1">
            <Activity className="w-4 h-4 " />
            <Text className="text-sm font-light">{data?.tingkatAktivitas}</Text>
          </View>
          {handleBaghe(data?.tingkatAktivitas)}
        </View>

        {isSelect && (
          <View className="flex justify-end mt-4 gap-2">
            <Button
              className="text-xs font-medium p-2 bg-[var(--shapeV1-parent)] rounded-lg flex items-center gap-1 justify-center"
              onClick={() =>
                alert.confirm({
                  icon: 'warning',
                  title: 'Hapus',
                  deskripsi: 'Apakah Anda yakin ingin menghapus kucing ini?',
                  onConfirm: () => {
                    if (data?._id) {
                      onDelete?.(data._id);
                    }
                  },
                })
              }
            >
              <UseTooltip content="Hapus">
                <Trash />
              </UseTooltip>
              Hapus
            </Button>
            <Button
              className="text-xs font-medium p-2 bg-[var(--shapeV1-parent)] rounded-lg flex items-center gap-1 justify-center"
              onClick={() => setIsModal?.('edit')}
            >
              Edit
            </Button>
          </View>
        )}

        <PopUp isOpen={isModal === 'edit'} onClose={() => setIsModal?.(null)}>
          <View className="w-full h-full">
            <View className="flex justify-center items-center flex-col">
              <Container className="w-full mt-4">
                <View className="flex justify-between items-center gap-4">
                  <View className="w-full gap-2">
                    <Text className="font-semibold">Nama Kucing :</Text>
                    <Input
                      placeholder="Contoh : Whiskers"
                      value={formEditKucing.namaKucing}
                      onChange={(e) =>
                        setFormEditKucing((prev) => ({
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
                          setFormEditKucing((prev) => ({ ...prev, ras: value }))
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
                      value={formEditKucing.umur ?? ''}
                      onChange={(e) =>
                        setFormEditKucing((prev) => ({
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
                        value={formEditKucing.berat ?? ''}
                        onChange={(e) =>
                          setFormEditKucing((prev) => ({
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
                <View className="flex justify-between items-center gap-4 ">
                  {aktivitas.map((item) => (
                    <div
                      key={item.label}
                      onClick={() =>
                        setFormEditKucing((prev) => ({
                          ...prev,
                          tingkatAktivitas: item.label,
                        }))
                      }
                      className={`h-auto w-auto rounded-lg border p-4 lg:p-3 cursor-pointer transition ${
                        formEditKucing.tingkatAktivitas === item.label
                          ? 'border-primary bg-primary/10'
                          : 'border-[var(--shapeV1-parent)]'
                      }`}
                    >
                      <View className="flex justify-center items-center flex-col">
                        <Text
                          className={`text-sm lg:text-lg font-semibold ${
                            formEditKucing.tingkatAktivitas === item.label ? 'text-primary' : ''
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
                    const checked = formEditKucing.kondisiKesehatan.includes(item);
                    return (
                      <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={item}
                          checked={checked}
                          onChange={(e) => {
                            setFormEditKucing((prev) => {
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
              <Spreed orientation="horizontal" className="my-2" />
              <Button
                className="w-full"
                onClick={() => handleEditCat()}
                disabled={editCat.isPending}
              >
                {editCat.isPending ? <Fallback title="Tunggu Sebentar" /> : 'Simpan Kucing'}
              </Button>
            </View>
          </View>
        </PopUp>

        <Spreed className="mt-6" />
      </Container>

      <View className="w-full px-3 py-2 flex items-center gap-2 border-t">
        <Heart className="w-4 h-4 text-red-500" />
        <Text className="text-sm font-medium">Kondisi Kesehatan : {data?.kondisiKesehatan}</Text>
      </View>
    </View>
  );
};

export default Kucing;
