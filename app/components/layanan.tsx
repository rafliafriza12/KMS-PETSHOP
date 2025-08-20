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
  Book,
  Edit3,
  Info,
  Trash2,
  Save,
  X,
  ShoppingCart,
  Cat,
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
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const baseKnow = 'knowledge_id' in data ? data.knowledge_id : data._id;
  const pathname = usePathname();
  const score = 'score' in data ? data.score : undefined;
  const alert = useAlert();
  const showForAdmin = pathname.includes('/admin/admin-panel');

  useEffect(() => {
    console.log('idKnow', baseKnow);
  }, [baseKnow]);

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
      text: 'text-destructive',
      bg: 'bg-destructive/20',
    },
    Rekomendasi: {
      text: 'text-warning',
      bg: 'bg-warning/20',
    },
    Biasa: {
      text: 'text-success',
      bg: 'bg-success/20',
    },
  } as const;
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

    return (
      <View className={`text-sm px-2 py-1 w-full rounded-lg ${cat.bg} ${cat.text}`}>
        {cat.icon}
      </View>
    );
  };

  const handleBagheKategori = (text: string) => {
    const cat = kategori[text as keyof typeof kategori];
    if (!cat) return null;

    return (
      <Label className={`text-sm font-light  px-2 py-1 rounded-lg ${cat.bg} ${cat.text}`}>
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

    if (score >= 0.7) text = 'Sangat Direkomendasikan';
    else if (score >= 0.4) text = 'Rekomendasi';
    else text = 'Biasa';

    const { text: textColor, bg: bgColor } = RekomendasiStyle[text];

    return (
      <h1 className={`text-xs font-extrabold px-3 py-1 rounded-full ${textColor} ${bgColor}`}>
        {text}
      </h1>
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
    <div
      className={`bg-[var(--shapeV2-parent)]  border rounded-lg shadow p-4 space-y-4 ${
        isSelect ? 'border-[var(--shapeV1-parent)]' : 'border'
      } 
      }`}
    >
      <View className="flex items-start justify-between gap-4">
        <View className="flex items-center justify-center">
          <View className="text-primary w-auto h-6 ">{handleIcon(layanan.kategori)}</View>
          <View className="gradient-primary/20  rounded-full px-3 py-1  text-sm ">
            {handleBagheKategori(layanan.kategori)}
          </View>
        </View>

        <View className="flex justify-center items-center flex-col gap-4">
          {!showForAdmin && (
            <View className="text-sm font-semibold">{handleRekomendasi(score ?? 0)}</View>
          )}

          {isSelect && role?.toLowerCase() === 'admin' && isActive === 'layanan' && (
            <View className="flex gap-3 flex-col">
              <Button
                className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift w-full h-full transition-all duration-300 animate-glow"
                onClick={() => handleOpenModal('Edit')}
              >
                <Edit3 className="w-4 h-4 mr-2 " />
                Edit
              </Button>
              <Button
                className="gradient-destructive text-primary-foreground px-4 py-2 rounded-full hover-lift w-full h-full transition-all duration-300 animate-glow"
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
                <Trash2 className="w-4 h-4 mr-2 " />
                Delete
              </Button>
            </View>
          )}
          {isSelect && role?.toLowerCase() === 'admin' && isActive === 'knowledge' && (
            <View className="gap-3 flex flex-col">
              <Button
                className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift w-full h-full transition-all duration-300 animate-glow"
                onClick={() => handleOpenModal('Knowledge')}
              >
                <Book className="w-4 h-4 mr-2 " />
                Tambah Knowledge
              </Button>
              <Link href={`/admin/admin-panel/knowledge/${baseKnow}`}>
                <Button className="gradient-info text-primary-foreground px-4 py-2 rounded-full hover-lift w-full h-full transition-all duration-300 animate-glow">
                  <Info className="w-4 h-4 mr-2 " />
                  Detail Knowledge
                </Button>
              </Link>
            </View>
          )}
        </View>
      </View>

      <View className="space-y-2 flex flex-col">
        <Text className="font-bold text-xl text-gradient-primary">{layanan.namaLayanan}</Text>
        <Text className="text-foreground">{layanan.deskripsi}</Text>
      </View>

      <View className="flex items-center justify-between">
        <View className="flex items-center gap-2 text-sm">
          <Clock className="text-primary w-5 h-5 " />
          <Label className="text-foreground">{layanan.durasiLayanan} Menit</Label>
        </View>
        <Label className="font-bold text-lg text-gradient-primary">
          Rp{layanan.harga.toLocaleString('id-ID')}
        </Label>
      </View>

      <View className="border border-gray-200/50 gradient-success/10 rounded-lg p-4 space-y-2 animate-glow backdrop-blur-enhanced">
        <p className="font-medium text-success">Mengapa cocok untuk kucing Anda:</p>
        <ul className="space-y-2 text-foreground">
          {layanan.benefit.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="text-success w-5 h-5 " />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </View>

      <Button
        className="w-full gradient-primary text-primary-foreground px-6 py-3 rounded-full hover-lift  h-full transition-all duration-300 animate-glow font-semibold"
        onClick={() => handleOpenModal('Keranjang')}
      >
        <ShoppingCart className="w-5 h-5 mr-2 " />
        Tambah ke Keranjang
      </Button>
      {onAddToChart && formAddToChart && setFormAddToChart && (
        <PopUp isOpen={isModal === 'Keranjang'} onClose={() => handleOpenModal(null)}>
          <Container className="w-full p-6 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced">
            <View className="flex justify-between items-center gap-4">
              <View className="flex items-center gap-3">
                <ShoppingCart className="text-primary w-6 h-6 " />
                <Text className="text-xl font-bold text-gradient-primary">Tambah Ke Keranjang</Text>
              </View>
              <ChevronRight
                className="text-primary w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-300 "
                onClick={() => handleOpenModal(null)}
              />
            </View>
            <Spreed orientation="horizontal" className="my-4 border-gray-200/50 animate-glow" />
            <Text className="font-bold p-2 rounded-lg gradient-primary/20 text-foreground animate-glow">
              Untuk Kucing: {selectData?.namaKucing}
            </Text>
            <View className="mt-4 flex justify-center items-start flex-col gap-4">
              <View className="flex items-center gap-2">
                <Calendar className="text-primary w-5 h-5 " />
                <Label className="text-base font-semibold text-gradient-neutral">
                  Pilih Tanggal :
                </Label>
              </View>
              <Input
                className=" card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50  w-full h-full transition-all duration-300   backdrop-blur-enhanced"
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
                <Clock8 className="text-primary w-5 h-5 " />
                <Label className="text-base font-semibold text-gradient-neutral">
                  Pilih Waktu :
                </Label>
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
                <SelectTrigger className=" card-glass rounded-lg p-3 bg-gradient-primary/20 border-gray-200/50  w-full h-full transition-all duration-300 backdrop-blur-enhanced">
                  <SelectValue placeholder="Pilih Jam" />
                  {/* Chore */}
                </SelectTrigger>
                <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
                  {jamSlot.map((slot, idx) => (
                    <SelectItem key={idx} value={slot.label}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>

            <Button
              className=" mt-6 gradient-primary text-primary-foreground px-6 py-3 rounded-full hover-lift w-full h-full transition-all duration-300 animate-glow font-semibold"
              onClick={() => onAddToChart(formAddToChart)}
              disabled={isPending}
            >
              {isPending ? (
                <Fallback title="Tunggu Sebentar" />
              ) : (
                <View className="flex items-center gap-2">
                  <Cat className="w-5 h-5 " />
                  <Label className="text-primary-foreground font-semibold">
                    Tambah Ke Keranjang
                  </Label>
                </View>
              )}
            </Button>
          </Container>
        </PopUp>
      )}

      {onEdit && formEditLayanan && setFormEditLayanan && (
        <PopUp isOpen={isModal === 'Edit'} onClose={() => handleOpenModal(null)}>
          <View className="w-full p-6 border card-glass rounded-xl shadow-enhanced space-y-6">
            <View className="flex justify-between items-center">
              <Text className="text-2xl font-bold text-gradient-primary">Layanan Edit</Text>
              <X onClick={() => handleOpenModal(null)} />
            </View>
            <Spreed orientation="horizontal" className="my-4 border-gray-200/50" />
            <View className="space-y-2">
              <Label className="text-base font-semibold text-gradient-neutral">Nama Layanan</Label>
              <Input
                value={formEditLayanan.namaLayanan}
                onChange={(e) =>
                  setFormEditLayanan((prev) => ({
                    ...prev,
                    namaLayanan: e.target.value,
                  }))
                }
                className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border border-[var(--shapeV1-parent)] hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced"
              />
            </View>

            <View className="space-y-2">
              <Label className="text-base font-semibold text-gradient-neutral">Deskripsi</Label>
              <Textarea
                value={formEditLayanan.deskripsi}
                onChange={(e) =>
                  setFormEditLayanan((prev) => ({
                    ...prev,
                    deskripsi: e.target.value,
                  }))
                }
                className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border border-[var(--shapeV1-parent)] hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced"
              />
            </View>

            <View className="space-y-2">
              <Label className="text-base font-semibold text-gradient-neutral">Benefit</Label>
              <View className="flex gap-2">
                <Input
                  value={currentBenefit}
                  onChange={(e) => setCurrentBenefit(e.target.value)}
                  placeholder="Tambah benefit"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddBenefit()}
                  className="card-glass w-full rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border border-[var(--shapeV1-parent)] hover-lift  h-full transition-all duration-300  backdrop-blur-enhanced"
                />
                <Button
                  type="button"
                  onClick={handleAddBenefit}
                  className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift w-auto h-full transition-all duration-300 "
                >
                  <Plus className="w-4 h-4 mr-2 " />
                  Tambah
                </Button>
              </View>
              <View className="flex flex-wrap gap-2 mt-2">
                {formEditLayanan.benefit.map((item, index) => (
                  <View
                    key={index}
                    className="gradient-primary/20 px-3 py-1 rounded-full flex items-center gap-2 text-foreground text-sm "
                  >
                    <Text>{item}</Text>
                    <button
                      onClick={() => handleRemoveBenefit(index)}
                      className="text-destructive hover:text-destructive-dark hover:scale-110 transition-all duration-300"
                    >
                      ×
                    </button>
                  </View>
                ))}
              </View>
            </View>

            <View className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <View className="space-y-2">
                <Label className="text-base font-semibold text-gradient-neutral">Harga</Label>
                <Input
                  type="number"
                  value={formEditLayanan.harga ?? ''}
                  onChange={(e) =>
                    setFormEditLayanan((prev) => ({
                      ...prev,
                      harga: e.target.value === '' ? null : Number(e.target.value),
                    }))
                  }
                  className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border border-[var(--shapeV1-parent)] hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced"
                />
              </View>
              <View className="space-y-2">
                <Label className="text-base font-semibold text-gradient-neutral">Diskon (%)</Label>
                <Input
                  type="number"
                  value={formEditLayanan.diskon ?? ''}
                  onChange={(e) =>
                    setFormEditLayanan((prev) => ({
                      ...prev,
                      diskon: e.target.value === '' ? null : Number(e.target.value),
                    }))
                  }
                  className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border border-[var(--shapeV1-parent)] hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced"
                />
              </View>
            </View>

            <View className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <View className="space-y-2">
                <Label className="text-base font-semibold text-gradient-neutral">
                  Durasi (menit)
                </Label>
                <Input
                  type="number"
                  value={formEditLayanan.durasiLayanan ?? ''}
                  onChange={(e) =>
                    setFormEditLayanan((prev) => ({
                      ...prev,
                      durasiLayanan: e.target.value === '' ? null : Number(e.target.value),
                    }))
                  }
                  className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border border-[var(--shapeV1-parent)] hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced"
                />
              </View>
              <View className="space-y-2">
                <Label className="text-base font-semibold text-gradient-neutral">Kategori</Label>
                <Select
                  value={formEditLayanan.kategori}
                  onValueChange={(value) =>
                    setFormEditLayanan((prev) => ({
                      ...prev,
                      kategori: value,
                    }))
                  }
                >
                  <SelectTrigger className=" card-glass rounded-lg p-3 bg-gradient-primary/20 border border-[var(--shapeV1-parent)] hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
                    <SelectItem value="Grooming">Grooming</SelectItem>
                    <SelectItem value="Kesehatan">Kesehatan</SelectItem>
                    <SelectItem value="Penitipan">Penitipan</SelectItem>
                    <SelectItem value="Nutrisi">Nutrisi</SelectItem>
                  </SelectContent>
                </Select>
              </View>
            </View>

            <View className="flex justify-end gap-3 pt-4">
              <Button
                onClick={() => {
                  if (onEdit) {
                    onEdit(formEditLayanan);
                  }
                }}
                disabled={isPending}
                className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift w-full h-full transition-all duration-300 "
              >
                <Save className="w-4 h-4 mr-2 " />
                {isPending ? <Fallback title="Tunggu Sebentar" /> : 'Simpan Layanan'}
              </Button>
            </View>
          </View>
        </PopUp>
      )}

      {onKnow && formBikinKnowledge && setFormBikinKnowledge && (
        <PopUp isOpen={isModal === 'Knowledge'} onClose={() => handleOpenModal(null)}>
          <View className="w-full p-6  card-glass rounded-xl shadow-enhanced space-y-4">
            <View className="w-full h-full">
              <View className="flex justify-between items-center">
                <Text className="text-lg font-semibold">Tambah Knowledge</Text>
                <X onClick={() => handleOpenModal(null)} />
              </View>
            </View>
            <Label className="text-base font-semibold text-gradient-neutral">Ras :</Label>
            <Select
              onValueChange={(value) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  ras: prev.ras.includes(value) ? prev.ras : [...prev.ras, value],
                }))
              }
            >
              <SelectTrigger className=" card-glass rounded-lg p-3 bg-gradient-primary/20border border-[var(--shapeV1-parent)] hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced">
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

            <div className="flex flex-wrap gap-2 mt-2">
              {formBikinKnowledge?.ras.map((ras, index) => (
                <span
                  key={index}
                  className="px-3 py-1 gradient-primary/20 rounded-full flex items-center gap-2 text-foreground text-sm "
                >
                  {ras}
                  <button
                    type="button"
                    className="text-destructive hover:text-destructive-dark hover:scale-110 transition-all duration-300"
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

            <Label className="text-base font-semibold text-gradient-neutral">Minimal Umur :</Label>
            <Input
              inputMode="numeric"
              value={formBikinKnowledge.min_umur ?? ''}
              placeholder="Contoh 1 Tahun"
              onChange={(e) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  min_umur: e.target.value === '' ? null : Number(e.target.value),
                }))
              }
              className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50  border-[var(--shapeV1-parent)] hover-lift w-full h-full transition-all border duration-300  backdrop-blur-enhanced"
            />

            <Label className="text-base font-semibold text-gradient-neutral">Maksimal Umur :</Label>
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
              className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50  hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced"
            />

            <Label className="text-base font-semibold text-gradient-neutral">Minimal Berat :</Label>
            <Input
              placeholder="Contoh 1 kg"
              inputMode="numeric"
              value={formBikinKnowledge.min_berat ?? ''}
              onChange={(e) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  min_berat: e.target.value === '' ? null : Number(e.target.value),
                }))
              }
              className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50  hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced"
            />

            <Label className="text-base font-semibold text-gradient-neutral">
              Maksimal Berat :
            </Label>
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
              className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50  hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced"
            />

            <Label className="text-base font-semibold text-gradient-neutral">
              Tingkat Aktivitas :
            </Label>
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
              <SelectTrigger className=" card-glass rounded-lg p-3 bg-gradient-primary/20  hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced">
                <SelectValue placeholder="Pilih Tingkat Aktivitas" />
              </SelectTrigger>
              <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
                <SelectItem value="rendah">Rendah</SelectItem>
                <SelectItem value="sedang">Sedang</SelectItem>
                <SelectItem value="tinggi">Tinggi</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 mt-2">
              {formBikinKnowledge?.tingkatAktivitas.map((tingkatAktivitas, index) => (
                <span
                  key={index}
                  className="px-3 py-1 gradient-primary/20 rounded-full flex items-center gap-2 text-foreground text-sm "
                >
                  {tingkatAktivitas}
                  <button
                    type="button"
                    className="text-destructive hover:text-destructive-dark hover:scale-110 transition-all duration-300"
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

            <Label className="text-base font-semibold text-gradient-neutral">Kondisi :</Label>
            <Select
              onValueChange={(value) =>
                setFormBikinKnowledge((prev) => ({
                  ...prev,
                  kondisi: prev.kondisi.includes(value) ? prev.kondisi : [...prev.kondisi, value],
                }))
              }
            >
              <SelectTrigger className=" card-glass rounded-lg p-3 bg-gradient-primary/20  hover-lift w-full h-full transition-all duration-300  backdrop-blur-enhanced">
                <SelectValue placeholder="Pilih Kondisi" />
              </SelectTrigger>
              <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
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
                  className="px-3 py-1 gradient-primary/20 rounded-full flex items-center gap-2 text-foreground text-sm "
                >
                  {kondisi}
                  <button
                    type="button"
                    className="text-destructive hover:text-destructive-dark hover:scale-110 transition-all duration-300"
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

            <Spreed orientation="horizontal" className="my-4  " />
            <Button
              className=" gradient-primary text-primary-foreground px-6 py-3 rounded-full hover-lift w-full h-full transition-all duration-300  font-semibold"
              onClick={() => {
                if (onKnow) {
                  onKnow(formBikinKnowledge);
                } else {
                  console.log('id layanan not found');
                }
              }}
              disabled={isPending}
            >
              <Book className="w-5 h-5 mr-2 " />
              {isPending ? <Fallback title="Tunggu Sebentar" /> : 'Tambahkan Knowledge'}
            </Button>
          </View>
        </PopUp>
      )}
    </div>
  );
};

export default LayananComponent;
