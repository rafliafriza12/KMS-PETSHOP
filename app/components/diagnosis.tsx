import View from './ui/view';
import { Cat, Calendar, Weight, Activity, Heart, Trash, Edit3, Sparkles } from 'lucide-react';
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
import { Label } from '@radix-ui/react-label';
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
      className={`flex flex-col shadow-sm/20 border rounded-xl ${
        isSelect ? 'border-[var(--shapeV1-parent)]' : 'border border-white/50'
      }`}
    >
      <View className="flex justify-between items-center w-full p-4 border-b border-border/30 relative ">
        <View className="flex items-center gap-4">
          <View className="relative">
            <View className="rounded-xl bg-gradient-to-br from-[var(--shapeV1-parent)] to-[var(--shapeV1-child)] p-3 shadow-lg transform transition-all duration-300 group-hover:scale-110">
              <Cat className="w-6 h-6 text-primary-foreground" />
              {isSelect && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-ping" />
              )}
            </View>
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-warning animate-pulse opacity-60" />
          </View>
          <View className="flex flex-col gap-1">
            <Text className="text-lg font-bold text-card-foreground group-hover:text-gradient-primary transition-colors">
              {data?.namaKucing}
            </Text>
            <Text className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-lg shadow-sm">
              {data?.ras}
            </Text>
          </View>
        </View>
        {isSelect && (
          <Label className="text-xs font-bold px-4 py-2 bg-gradient-to-r from-[var(--shapeV1-parent)] to-[var(--shapeV1-child)] text-primary-foreground rounded-full shadow-lg flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
            Dipilih
          </Label>
        )}
      </View>

      <Container className="p-4 w-full relative ">
        <View className="grid grid-cols-2 gap-4 mb-4">
          <View className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/20 transition-all hover:shadow-md hover:border-[var(--shapeV1-parent)]/30 group/stat">
            <Calendar className="w-5 h-5 text-info group-hover/stat:animate-bounce" />
            <div className="flex flex-col">
              <Text className="text-xs text-muted-foreground font-medium">Umur</Text>
              <Text className="text-sm font-bold text-card-foreground">{data?.umur} Tahun</Text>
            </div>
          </View>
          <View className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/20 transition-all hover:shadow-md hover:border-[var(--shapeV1-parent)]/30 group/stat">
            <Weight className="w-5 h-5 text-success group-hover/stat:animate-bounce" />
            <div className="flex flex-col">
              <Text className="text-xs text-muted-foreground font-medium">Berat</Text>
              <Text className="text-sm font-bold text-card-foreground">{data?.berat} Kg</Text>
            </div>
          </View>
        </View>

        <View className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-border/20 mb-4">
          <View className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-muted-foreground animate-pulse" />
            <Label className="font-semibold text-muted-foreground">Tingkat Aktivitas:</Label>
          </View>
          {handleBaghe(data?.tingkatAktivitas)}
        </View>

        {isSelect && (
          <View className="flex justify-end mt-6 gap-3">
            <Button
              className="group/btn text-sm font-semibold px-4 py-2 bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              onClick={() =>
                alert.confirm({
                  icon: 'warning',
                  title: 'Hapus',
                  deskripsi: 'Apakah Anda yakin ingin menghapus kucing ini?',
                  onConfirm: () => data?._id && onDelete?.(data._id),
                })
              }
            >
              <UseTooltip content="Hapus">
                <Trash className="w-4 h-4 group-hover/btn:animate-bounce" />
              </UseTooltip>
              Hapus
            </Button>
            <Button
              className="group/btn text-sm font-semibold px-4 py-2 bg-gradient-to-r from-[var(--shapeV1-parent)] to-[var(--shapeV1-child)] text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              onClick={() => {
                setFormEditKucing({
                  namaKucing: data?.namaKucing ?? '',
                  ras: data?.ras ?? '',
                  tingkatAktivitas: data?.tingkatAktivitas ?? '',
                  umur: data?.umur ?? null,
                  berat: data?.berat ?? null,
                  kondisiKesehatan: data?.kondisiKesehatan ?? [],
                });
                setIsModal('edit');
              }}
            >
              <Edit3 className="w-4 h-4 group-hover/btn:animate-bounce" />
              Edit
            </Button>
          </View>
        )}

        <PopUp isOpen={isModal === 'edit'} onClose={() => setIsModal?.(null)}>
          <View className="w-full p-6 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced">
            <View className="flex justify-center items-center flex-col">
              <Container className="w-full mt-6">
                <View className="flex flex-col lg:flex-row justify-between items-center gap-4">
                  <View className="w-full space-y-2">
                    <Text className="text-base font-semibold text-gradient-neutral">
                      Nama Kucing :
                    </Text>
                    <Input
                      placeholder="Contoh : Whiskers"
                      value={formEditKucing.namaKucing}
                      onChange={(e) =>
                        setFormEditKucing((prev) => ({
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
                        setFormEditKucing((prev) => ({ ...prev, ras: value }))
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

              <Container className="w-full mt-4">
                <View className="flex flex-col lg:flex-row justify-between items-center gap-4">
                  <View className="w-full space-y-2">
                    <Text className="text-base font-semibold text-gradient-neutral">
                      Umur (tahun) :
                    </Text>
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
                      value={formEditKucing.berat ?? ''}
                      onChange={(e) =>
                        setFormEditKucing((prev) => ({
                          ...prev,
                          berat: e.target.value === '' ? null : Number(e.target.value),
                        }))
                      }
                      className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift h-full transition-all duration-300 animate-glow backdrop-blur-enhanced"
                    />
                  </View>
                </View>
              </Container>

              <Container className="w-full mt-4">
                <Text className="text-base font-semibold text-gradient-neutral">
                  Tingkat Aktivitas
                </Text>
                <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                  {aktivitas.map((item) => (
                    <div
                      key={item.label}
                      onClick={() =>
                        setFormEditKucing((prev) => ({
                          ...prev,
                          tingkatAktivitas: item.label,
                        }))
                      }
                      className={` w-full rounded-xl p-4 cursor-pointer transition-all duration-300 hover-lift h-full card-glass shadow-enhanced animate-glow backdrop-blur-enhanced ${
                        formEditKucing.tingkatAktivitas === item.label
                          ? 'gradient-primary/20 border-primary'
                          : 'border-[var(--shapeV1-parent)]/50 bg-[var(--shapeV2-parent)]/50'
                      }`}
                    >
                      <View className="flex justify-center items-center flex-col gap-2">
                        <Text
                          className={`text-base font-semibold ${
                            formEditKucing.tingkatAktivitas === item.label
                              ? 'text-gradient-primary'
                              : 'text-foreground'
                          }`}
                        >
                          {item.label}
                        </Text>
                        <Text className="text-sm text-center text-muted-foreground">
                          {item.desc}
                        </Text>
                      </View>
                    </div>
                  ))}
                </View>
              </Container>

              <Container className="w-full mt-4">
                <Text className="text-base font-semibold text-gradient-neutral">
                  Kondisi Kesehatan (opsional)
                </Text>
                <View className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                  {PenyakitKucing.map((item) => {
                    const checked = formEditKucing.kondisiKesehatan.includes(item);
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
                          className="w-5 h-5 text-primary border-gray-200/50 rounded focus:ring-primary animate-glow"
                        />
                        <span className="text-foreground text-sm">{item}</span>
                      </label>
                    );
                  })}
                </View>
              </Container>

              <Spreed orientation="horizontal" className="my-4 border-gray-200/50 animate-glow" />
              <Button
                className="w-full gradient-primary text-primary-foreground px-6 py-3 rounded-full hover-lift hover:opacity-90 transition-all duration-300 animate-glow font-semibold"
                onClick={() => handleEditCat()}
                disabled={editCat.isPending}
              >
                {editCat.isPending ? (
                  <Fallback title="Tunggu Sebentar" />
                ) : (
                  <>
                    <Cat className="w-5 h-5 mr-2 " />
                    Simpan Kucing
                  </>
                )}
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
