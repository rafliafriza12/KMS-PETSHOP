import View from './ui/view';
import {
  Heart,
  Clock,
  Check,
  Scissors,
  House,
  GraduationCap,
  Apple,
  Star,
  Calendar,
  Clock8,
  Plus,
} from 'lucide-react';
import { Text } from './ui/Text';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import PopUp from '../core/components/pop-up';
import Container from './ui/container';
import { ChevronRight } from 'lucide-react';
import Spreed from '../core/components/spreed';
import { Input } from './ui/input';
import { useAppSelector } from '../hooks/dispatch/dispatch';
import { useAlert } from '../hooks/alert/costum-alert';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  FormAddToChartSchema,
  FormBikinKnowledgeSchema,
  FormBikinLayananScham,
} from '../types/form';
import { LayanananByRekomendasiType, LayananAppType } from '../types/components';
import Fallback from './ui/fallback';
import { RasKucing } from '../core/constants/ras';
import { PenyakitKucing } from '../core/constants/penyakit';

interface LayananComponentProps {
  data: LayanananByRekomendasiType | LayananAppType;
  isSelect?: boolean;
  onDelete?: (_id: string) => void;
  onEdit?: (payload: FormBikinLayananScham) => void;
  isPending?: boolean;
  onKnow?: (payload: FormBikinKnowledgeSchema) => void;
  formEditLayanan?: FormBikinLayananScham;
  setFormEditLayanan?: React.Dispatch<React.SetStateAction<FormBikinLayananScham>>;
  isModal?: 'Keranjang' | 'Edit' | 'Knowledge' | null;
  setIsModal?: React.Dispatch<React.SetStateAction<'Keranjang' | 'Edit' | 'Knowledge' | null>>;
  isActive?: 'overview' | 'pengguna' | 'knowledge' | 'layanan' | null;
  formBikinKnowledge?: FormBikinKnowledgeSchema;
  setFormBikinKnowledge?: React.Dispatch<React.SetStateAction<FormBikinKnowledgeSchema>>;

  formAddToChart?: FormAddToChartSchema;
  setFormAddToChart?: React.Dispatch<React.SetStateAction<FormAddToChartSchema>>;
  onAddToChart?: (payload: FormAddToChartSchema) => void;
}

const LayananComponent: React.FC<LayananComponentProps> = ({
  data,
  isSelect,
  onDelete,
  onEdit,
  formEditLayanan,
  setFormEditLayanan,
  isPending,
  isModal,
  setIsModal,
  onKnow,
  formBikinKnowledge,
  setFormBikinKnowledge,
  isActive,
  onAddToChart,
  formAddToChart,
  setFormAddToChart,
}) => {
  const role = useAppSelector((state) => state.auth.currentUser?.user.role);
  const handleOpenModal = (type: 'Keranjang' | 'Edit' | 'Knowledge' | null) => {
    if (setIsModal) {
      setIsModal(type);
    } else {
      console.warn('setIsModal tidak tersedia');
    }
  };
  const selectData = useAppSelector((state) => state.cat.selectedCat);
  const layanan = 'layanan' in data ? data.layanan : data;
  const score = 'score' in data ? data.score : undefined;
  const alert = useAlert();

  const kategori = {
    Grooming: {
      bg: 'bg-[#EDE9FE]',
      text: 'text-[#6D28D9]',
      icon: <Scissors />,
    },
    Kesehatan: {
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#B91C1C]',
      icon: <Heart />,
    },
    Penitipan: {
      bg: 'bg-[#DBEAFE]',
      text: 'text-[#1D4ED8]',
      icon: <House />,
    },
    Nutrisi: {
      bg: 'bg-[#FFEDD5]',
      text: 'text-[#C2410C]',
      icon: <Apple />,
    },
    Pelatihan: {
      bg: 'bg-[#DCFCE7]',
      text: 'text-[#16A34A]',
      icon: <GraduationCap />,
    },
  };

  const RekomendasiStyle = {
    'Sangat Direkomendasikan': {
      bg: 'bg-red-100',
      text: 'text-red-600',
    },
    Rekomendasi: {
      bg: 'bg-[#FEF9C3]',
      text: 'text-[#9F5F1D]',
    },
    'Biasa Saja': {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
    },
  };

  const jamSlot: {
    label: '09:00' | '10:00' | '11:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00';
  }[] = [
    { label: '09:00' },
    { label: '10:00' },
    { label: '11:00' },
    { label: '13:00' },
    { label: '14:00' },
    { label: '15:00' },
    { label: '16:00' },
    { label: '17:00' },
  ];

  const handleIcon = (text: string) => {
    const cat = kategori[text as keyof typeof kategori];
    if (!cat) return null;

    return <View className={`text-sm px-2 py-1 rounded-lg ${cat.bg} ${cat.text}`}>{cat.icon}</View>;
  };

  const handleBagheKategori = (text: string) => {
    const cat = kategori[text as keyof typeof kategori];
    if (!cat) return null;

    return (
      <Label className={`text-sm font-light px-2 py-1 rounded-lg ${cat.bg} ${cat.text}`}>
        {text}
      </Label>
    );
  };

  const handlePupolar = (text: string) => {
    if (!text) {
      return null;
    }
    return (
      <Label
        className={`text-xs font-medium px-3 py-1 rounded-full bg-[#FEF9C3] text-[#9F5F1D] flex items-center gap-2`}
      >
        <Star />
        {text}
      </Label>
    );
  };

  const handleRekomendasi = (score: number) => {
    let text: keyof typeof RekomendasiStyle;
    if (score >= 0.7) {
      text = 'Sangat Direkomendasikan';
    } else if (score >= 0.4) {
      text = 'Rekomendasi';
    } else {
      text = 'Biasa Saja';
    }

    const rec = RekomendasiStyle[text];
    return (
      <Label className={`text-xs font-medium px-3 py-1 rounded-full ${rec.bg} ${rec.text}`}>
        {text}
      </Label>
    );
  };

  const [currentBenefit, setCurrentBenefit] = useState('');
  const handleAddBenefit = () => {
    if (currentBenefit.trim() && setFormEditLayanan && formEditLayanan) {
      setFormEditLayanan((prev) => ({
        ...prev,
        benefit: [...prev.benefit, currentBenefit.trim()],
      }));
      setCurrentBenefit('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    if (setFormEditLayanan && formEditLayanan) {
      setFormEditLayanan((prev) => {
        const newBenefits = [...prev.benefit];
        newBenefits.splice(index, 1);
        return { ...prev, benefit: newBenefits };
      });
    }
  };

  return (
    <View
      className={`bg-[var(--shapeV2-parent)]  border rounded-lg shadow p-4 space-y-4 ${
        isSelect ? 'border-red-500' : 'border'
      }`}
    >
      <View className="flex items-start justify-between">
        <View className="flex items-center gap-2">
          <View className="">{handleIcon(layanan.kategori)}</View>
          {handleBagheKategori(layanan.kategori)}
        </View>
        <View className="flex justify-center items-center flex-col gap-4">
          {/* {handlePupolar(data.popular ?? '')} */}
          {handleRekomendasi(score ?? 0)}
          {isSelect && role?.toLowerCase() === 'admin' && isActive === 'layanan' && (
            <View className="flex gap-2">
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleOpenModal('Edit')}
              >
                Edit
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() =>
                  alert.confirm({
                    icon: 'warning',
                    title: 'Hapus',
                    deskripsi: 'Apakah Anda yakin ingin menghapus Layanan ini?',
                    onConfirm: () => {
                      if (layanan._id) {
                        onDelete?.(layanan._id);
                      }
                    },
                  })
                }
              >
                Delete
              </Button>
            </View>
          )}
          {isSelect && role?.toLowerCase() === 'admin' && isActive === 'knowledge' && (
            <View className="gap-2">
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleOpenModal('Knowledge')}
              >
                Tambah Knowlage
              </Button>
            </View>
          )}
        </View>
      </View>

      {onKnow && formBikinKnowledge && setFormBikinKnowledge && (
        <PopUp isOpen={isModal === 'Knowledge'} onClose={() => handleOpenModal(null)}>
          <View className="w-full h-full">
            <Label className="font-semibold ">Ras :</Label>
            <Select
              onValueChange={(value) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  ras: prev.ras.includes(value) ? prev.ras : [...prev.ras, value],
                }))
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

            <div className="flex flex-wrap gap-2 mt-2">
              {formBikinKnowledge?.ras.map((ras, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[var(--shapeV1-parent)] rounded-full flex items-center gap-1"
                >
                  {ras}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      setFormBikinKnowledge((prev) => {
                        const newRas = [...prev.ras];
                        newRas.splice(index, 1);
                        return { ...prev, ras: newRas };
                      })
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <Label className="font-semibold">Minimal Umur :</Label>
            <Input
              inputMode="numeric"
              value={formBikinKnowledge.min_umur ?? ''}
              placeholder="Contoh 1 Minggu"
              onChange={(e) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  min_umur: e.target.value === '' ? null : Number(e.target.value),
                }))
              }
            />
            <Label className="font-semibold">Maksimal Umur :</Label>
            <Input
              placeholder="Contoh 1 Tahun"
              inputMode="numeric"
              value={formBikinKnowledge.max_umur ?? ''}
              onChange={(e) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  max_umur: e.target.value === '' ? null : Number(e.target.value),
                }))
              }
            />
            <Label className="font-semibold">Minimal Berat :</Label>
            <Input
              placeholder="Contoh 1 on"
              inputMode="numeric"
              value={formBikinKnowledge.min_berat ?? ''}
              onChange={(e) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  min_berat: e.target.value === '' ? null : Number(e.target.value),
                }))
              }
            />

            <Label className="font-semibold">Maksimal Berat :</Label>
            <Input
              placeholder="Contoh 1 kg"
              inputMode="numeric"
              value={formBikinKnowledge.max_berat ?? ''}
              onChange={(e) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  max_berat: e.target.value === '' ? null : Number(e.target.value),
                }))
              }
            />
            <Label className="font-semibold">Tingkat Aktifitas :</Label>
            <Select
              onValueChange={(value) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  tingkatAktivitas: prev.tingkatAktivitas.includes(value)
                    ? prev.tingkatAktivitas
                    : [...prev.tingkatAktivitas, value],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Tingkat Aktifitas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rendah">Rendah</SelectItem>
                <SelectItem value="sedang">Sedang</SelectItem>
                <SelectItem value="tinggi">Tinggi</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 mt-2">
              {formBikinKnowledge?.tingkatAktivitas.map((tingkatAktivitas, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[var(--shapeV1-parent)] rounded-full flex items-center gap-1"
                >
                  {tingkatAktivitas}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      setFormBikinKnowledge((prev) => {
                        const newRas = [...prev.tingkatAktivitas];
                        newRas.splice(index, 1);
                        return { ...prev, tingkatAktivitas: newRas };
                      })
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <Label className="font-semibold">Kondisi :</Label>
            <Select
              onValueChange={(value) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  kondisi: prev.kondisi.includes(value) ? prev.kondisi : [...prev.kondisi, value],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Kondisi" />
              </SelectTrigger>
              <SelectContent>
                {PenyakitKucing.map((ras) => (
                  <SelectItem key={ras} value={ras}>
                    {ras}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 mt-2">
              {formBikinKnowledge?.kondisi.map((kondisi, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[var(--shapeV1-parent)] rounded-full flex items-center gap-1"
                >
                  {kondisi}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      setFormBikinKnowledge((prev) => {
                        const newRas = [...prev.kondisi];
                        newRas.splice(index, 1);
                        return { ...prev, kondisi: newRas };
                      })
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <Spreed orientation="horizontal" className="my-2" />
            <Button
              className="w-full my-2"
              onClick={() => {
                if (onKnow) {
                  onKnow(formBikinKnowledge);
                } else {
                  console.log('id layanan not found');
                }
              }}
              disabled={isPending}
            >
              Tambahakan Knowledge
            </Button>
          </View>
        </PopUp>
      )}

      {onEdit && formEditLayanan && setFormEditLayanan && (
        <PopUp isOpen={isModal === 'Edit'} onClose={() => handleOpenModal(null)}>
          <View className="w-full  p-6 ">
            <Text className="text-xl font-bold">Layanan Edit</Text>

            <View className="space-y-2">
              <Label>Nama Layanan</Label>
              <Input
                value={formEditLayanan.namaLayanan}
                onChange={(e) =>
                  setFormEditLayanan((prev) => ({
                    ...prev,
                    namaLayanan: e.target.value,
                  }))
                }
              />
            </View>

            <View className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea
                value={formEditLayanan.deskripsi}
                onChange={(e) =>
                  setFormEditLayanan((prev) => ({
                    ...prev,
                    deskripsi: e.target.value,
                  }))
                }
              />
            </View>

            <View className="space-y-2">
              <Label>Benefit</Label>
              <View className="flex gap-2">
                <Input
                  value={currentBenefit}
                  onChange={(e) => setCurrentBenefit(e.target.value)}
                  placeholder="Tambah benefit"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddBenefit()}
                />
                <Button type="button" onClick={handleAddBenefit}>
                  Tambah
                </Button>
              </View>
              <View className="flex flex-wrap gap-2 mt-2">
                {formEditLayanan.benefit.map((item, index) => (
                  <View
                    key={index}
                    className="bg-[var(--shapeV1-parent)] px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <Text>{item}</Text>
                    <button onClick={() => handleRemoveBenefit(index)} className="text-red-500">
                      ×
                    </button>
                  </View>
                ))}
              </View>
            </View>

            <View className="grid grid-cols-2 gap-4">
              <View className="space-y-2">
                <Label>Harga</Label>
                <Input
                  type="number"
                  value={formEditLayanan.harga ?? ''}
                  onChange={(e) =>
                    setFormEditLayanan((prev) => ({
                      ...prev,
                      harga: e.target.value === '' ? null : Number(e.target.value),
                    }))
                  }
                />
              </View>

              <View className="space-y-2">
                <Label>Diskon (%)</Label>
                <Input
                  type="number"
                  value={formEditLayanan.diskon ?? ''}
                  onChange={(e) =>
                    setFormEditLayanan((prev) => ({
                      ...prev,
                      diskon: e.target.value === '' ? null : Number(e.target.value),
                    }))
                  }
                />
              </View>
            </View>

            <View className="grid grid-cols-2 gap-4">
              <View className="space-y-2">
                <Label>Durasi (menit)</Label>
                <Input
                  type="number"
                  value={formEditLayanan.durasiLayanan ?? ''}
                  onChange={(e) =>
                    setFormEditLayanan((prev) => ({
                      ...prev,
                      durasiLayanan: e.target.value === '' ? null : Number(e.target.value),
                    }))
                  }
                />
              </View>

              <View className="space-y-2">
                <Label>Kategori</Label>
                <Select
                  value={formEditLayanan.kategori}
                  onValueChange={(value) =>
                    setFormEditLayanan((prev) => ({
                      ...prev,
                      kategori: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grooming">Grooming</SelectItem>
                    <SelectItem value="Kesehatan">Kesehatan</SelectItem>
                    <SelectItem value="Penitipan">Penitipan</SelectItem>
                    <SelectItem value="Nutrisi">Nutrisi</SelectItem>
                  </SelectContent>
                </Select>
              </View>
            </View>

            <View className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formEditLayanan.status}
                onValueChange={(value) =>
                  setFormEditLayanan((prev) => ({
                    ...prev,
                    status: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </View>

            <View className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => handleOpenModal(null)}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  if (onEdit) {
                    onEdit(formEditLayanan);
                  }
                }}
                disabled={isPending}
              >
                {isPending ? <Fallback title="Tunggu Sebentar" /> : 'Simpan Layanan'}
              </Button>
            </View>
          </View>
        </PopUp>
      )}

      <View>
        <Text className="font-bold text-lg">{layanan.namaLayanan}</Text> <br />
        <Text className="">{layanan.deskripsi}</Text>
      </View>

      <View className="flex items-center justify-between">
        <View className="flex items-center gap-1  text-sm">
          <Clock size={16} />
          <Label>{layanan.durasiLayanan} Menit</Label>
        </View>
        <Label className="text-[var(--shapeV1-child)] font-bold text-lg">Rp{layanan.harga}</Label>
      </View>

      <View className="border border-[var(--shapeV2-parent)] bg-[#F0FDF4]/90 rounded-lg p-3 space-y-1">
        <p className="font-medium text-green-800">Mengapa cocok untuk kucing Anda:</p>
        <ul className="space-y-1 text-green-700">
          {layanan.benefit.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check size={16} className="text-green-600" /> {item}
            </li>
          ))}
        </ul>
      </View>

      <Button className="w-full font-semibold" onClick={() => handleOpenModal('Keranjang')}>
        Tambah ke Keranjang
      </Button>
      {onAddToChart && formAddToChart && setFormAddToChart && (
        <PopUp isOpen={isModal === 'Keranjang'} onClose={() => handleOpenModal(null)}>
          <Container className="w-full ">
            <View className="flex justify-between items-center gap-2">
              <View className="flex">
                <Text className="font-bold">Tambah Ke Keranjang</Text>
              </View>
              <ChevronRight
                className="text-foreground cursor-pointer"
                onClick={() => handleOpenModal(null)}
              />
            </View>
            <Spreed orientation="horizontal" className="my-4" />
            <View className="flex justify-center items-start p-4 flex-col bg-[var(--shapeV1-parent)]/30 rounded-lg">
              <Label className="font-bold ">{layanan.namaLayanan}</Label>
              <Text>Untuk : {selectData?.namaKucing}</Text>
              <View className="flex justify-between items-center w-full">
                <Text>Durasi:{layanan.durasiLayanan}</Text>
                <Text>Rp. {layanan.harga}</Text>
              </View>
            </View>
            <View className="mt-4 flex justify-center items-start flex-col gap-2">
              <View className="flex items-center gap-2">
                <Calendar />
                <Label className="font-light">Pilih Tanggal :</Label>
              </View>
              <Input
                className="w-full"
                type="date"
                value={formAddToChart.jadwal?.split('T')[0] || ''}
                onChange={(e) => {
                  const tanggal = e.target.value;
                  const jam = formAddToChart.jadwal?.split('T')[1] || '09:00';
                  setFormAddToChart((prev) => ({
                    ...prev,
                    jadwal: `${tanggal}T${jam}`,
                  }));
                }}
              />

              <View className="flex items-center gap-2 mt-4">
                <Clock8 />
                <Label className="font-light">Pilih Waktu :</Label>
              </View>
              <Select
                value={formAddToChart.jadwal?.split('T')[1] || ''}
                onValueChange={(value) => {
                  const tanggal = formAddToChart.jadwal?.split('T')[0] || '';
                  setFormAddToChart((prev) => ({
                    ...prev,
                    jadwal: `${tanggal}T${value}`,
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Jam" />
                </SelectTrigger>
                <SelectContent>
                  {jamSlot.map((slot, idx) => (
                    <SelectItem key={idx} value={slot.label}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>

            <Button className="w-full mt-6" onClick={() => onAddToChart(formAddToChart)}>
              <View className="flex justify-center items-center gap-1">
                <Plus />
                <Label className="font-semibold">Tambah Ke Keranjang</Label>
              </View>
            </Button>
          </Container>
        </PopUp>
      )}
    </View>
  );
};

export default LayananComponent;
