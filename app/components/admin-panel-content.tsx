import { useEffect, useState } from 'react';
import View from './ui/view';
import { Text } from './ui/Text';
import Container from './ui/container';
import { Button } from './ui/button';
import {
  ChartLine,
  Database,
  Eye,
  EyeOff,
  Mail,
  Settings,
  User,
  Lock,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  UserPlus,
} from 'lucide-react';
import { useGetUsers } from '../hooks/mutasion/admin-panel/useGetUser';
import Spreed from '../core/components/spreed';
import { useOverview } from '../hooks/mutasion/admin-panel/useOverview';
import Link from 'next/link';
import PopUp from '../core/components/pop-up';
import { useDeleteUser } from '../hooks/mutasion/auth/useDeleteUser';
import { useGetLayanan } from '../hooks/mutasion/layanan/useGetLayanan';
import LayananComponent from './layanan';
import { useDeleteLayanan } from '../hooks/mutasion/layanan/useDeleteLayanan';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import {
  FormBikinKnowledgeSchema,
  FormBikinLayananScham,
  FormEditProfileSchema,
} from '../types/form';
import { useCreateLayanan } from '../hooks/mutasion/layanan/useCreateLayanan';
import { useAlert } from '../hooks/alert/costum-alert';
import { useEditLayanan } from '../hooks/mutasion/layanan/useEditLayanan';
import { useEditProfile } from '../hooks/mutasion/auth/useEditProfile';
import { useAppSelector } from '../hooks/dispatch/dispatch';
import Fallback from './ui/fallback';
import { FormRegisterSchema } from '../types/form';
import { useRegister } from '../hooks/mutasion/auth/useRegister';
import { useCreateKnow } from '../hooks/mutasion/knowleghe/useCreateKnow';
import { normalizeToLowercase } from '../utils/string.format';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const AdminPanelContent = () => {
  const curentRole = useAppSelector((state) => state.auth.currentUser?.user.role);
  const alert = useAlert();
  const createlayanan = useCreateLayanan();
  const Over = useOverview();
  const users = useGetUsers();
  const deleteUsers = useDeleteUser();
  const tambahPengguna = useRegister({
    onAfterSuccess: () => {
      setIsModal(null);
    },
  });
  const { data } = useGetLayanan();
  const [selectId, setSelectId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const barAnimationPlugin = {
    id: 'barAnimation',
    beforeDatasetDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      data.datasets.forEach((dataset: any, i: any) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar: any, index: any) => {
          const gradient = ctx.createLinearGradient(0, bar.y, 0, bar.y - bar.height);
          gradient.addColorStop(0, 'rgba(69, 59, 207, 0.5)'); // primary: #453BCF
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.8)'); // primary-dark: #6366F1
          dataset.backgroundColor = gradient;
        });
      });
      ctx.restore();
    },
  };

  ChartJS.register(barAnimationPlugin);

  const [formBikinKnowledge, setFormBikinKnowledge] = useState<FormBikinKnowledgeSchema>({
    kondisi: [],
    max_berat: null,
    max_umur: null,
    min_berat: null,
    min_umur: null,
    ras: [],
    tingkatAktivitas: [],
  });

  const [isActive, setIsActive] = useState<
    'overview' | 'pengguna' | 'knowledge' | 'layanan' | null
  >('overview');
  const [isModal, setIsModal] = useState<
    'Tambah-Layanan' | 'EditProfile' | 'Tambah-Pengguna' | null
  >(null);

  const editLayananMutation = useEditLayanan(selectId || '', {
    onAfterSuccess: () => {
      setChildModal(null);
    },
  });

  const createKnow = useCreateKnow(selectId || '', {
    onAfterSuccess: () => {
      setChildModal(null);
    },
  });

  const [childModal, setChildModal] = useState<'Keranjang' | 'Edit' | 'Knowledge' | null>(null);
  const handleOpenEditModal = (user: any) => {
    setSelectedUserId(user._id);
    setFormEditProfile({
      namaLengkap: user.namaLengkap || '',
      email: user.email || '',
      password: '',
      role: user.role || '',
    });
    setIsModal('EditProfile');
  };
  const [formBikinLayanan, setFormBikinLayanan] = useState<FormBikinLayananScham>({
    namaLayanan: '',
    deskripsi: '',
    benefit: [],
    harga: null,
    diskon: null,
    durasiLayanan: null,
    kategori: '',
  });

  const [formEditLayanan, setFormEditLayanan] = useState<FormBikinLayananScham>({
    namaLayanan: '',
    deskripsi: '',
    benefit: [],
    harga: null,
    diskon: null,
    durasiLayanan: null,
    kategori: '',
    status: '',
  });

  const [formEditProfile, setFormEditProfile] = useState<FormEditProfileSchema>({
    email: '',
    namaLengkap: '',
    password: '',
    role: '',
  });

  const [formTambahPengguna, setFormTambahaPengguna] = useState<FormRegisterSchema>({
    email: '',
    namaLengkap: '',
    password: '',
    role: '',
  });

  const handleTambahPengguna = () => {
    if (
      !formTambahPengguna.email ||
      !formTambahPengguna.namaLengkap ||
      !formTambahPengguna.password
    ) {
      alert.toast({
        title: 'Perhatian!',
        message: 'Mohon Isi Semua Field',
        icon: 'warning',
      });
      return;
    }
    return tambahPengguna.mutate(formTambahPengguna);
  };
  const handleEdit = (formData: FormBikinLayananScham) => {
    if (selectId) {
      editLayananMutation.mutate(formData);
    }
    setIsModal(null);
  };

  const deleteLayanan = useDeleteLayanan({
    onAfterSuccess: () => {
      console.log('Layana Berhasil Dihapus');
    },
  });

  const editUser = useEditProfile(selectedUserId || '', {
    onAfterSuccess: () => {
      setIsModal(null);
    },
  });

  const handleBikinKnow = (payload: FormBikinKnowledgeSchema) => {
    if (
      !formBikinKnowledge.kondisi ||
      !formBikinKnowledge.max_berat ||
      !formBikinKnowledge.max_umur ||
      !formBikinKnowledge.min_berat ||
      !formBikinKnowledge.min_umur ||
      !formBikinKnowledge.ras ||
      !formBikinKnowledge.tingkatAktivitas
    ) {
      alert.toast({
        title: 'Perhatian',
        message: 'Mohon Isi Semua Colum Tersedia',
        icon: 'warning',
      });
      return;
    }
    const LowerCase = normalizeToLowercase(formBikinKnowledge);
    console.log('all data knowleght', LowerCase);
    return createKnow.mutate(LowerCase);
  };
  const handleEditUser = (_id: string) => {
    editUser.mutate(formEditProfile);
  };

  const handleDelete = (id: string) => {
    deleteLayanan.mutate(id);
  };
  const handleDeleteUser = (id: string) => {
    deleteUsers.mutate(id);
  };
  const [currentBenefit, setCurrentBenefit] = useState('');
  const handleAddBenefit = () => {
    if (currentBenefit.trim()) {
      setFormBikinLayanan((prev) => ({
        ...prev,
        benefit: [...prev.benefit, currentBenefit.trim()],
      }));
      setCurrentBenefit('');
    }
  };
  const handleRemoveBenefit = (index: number) => {
    setFormBikinLayanan((prev) => {
      const newBenefits = [...prev.benefit];
      newBenefits.splice(index, 1);
      return { ...prev, benefit: newBenefits };
    });
  };

  const handleCreateLayanan = () => {
    if (
      !formBikinLayanan.benefit ||
      !formBikinLayanan.deskripsi ||
      !formBikinLayanan.durasiLayanan ||
      !formBikinLayanan.harga ||
      !formBikinLayanan.kategori ||
      !formBikinLayanan.namaLayanan
    ) {
      alert.toast({
        title: 'Perhatian',
        message: 'Mohon Isi Kolom Yang Wajib',
        icon: 'warning',
      });
      return;
    }
    createlayanan.mutate(formBikinLayanan);
    setIsModal(null);
  };

  return (
    <Container as="section" className="p-4 rounded-lg ">
      <View className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setIsActive('overview')}
          className={`flex gap-2 font-semibold ${
            isActive === 'overview' ? 'bg-primary text-white' : 'text-foreground'
          }`}
        >
          <ChartLine />
          Overview
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('pengguna')}
          className={`flex gap-2 font-semibold ${
            isActive === 'pengguna' ? 'bg-primary text-white' : 'text-foreground'
          }`}
        >
          <User />
          Pengguna
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('layanan')}
          className={`flex gap-2 font-semibold ${
            isActive === 'layanan' ? 'bg-primary text-white' : 'text-foreground'
          }`}
        >
          <Settings />
          Layanan
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('knowledge')}
          className={`flex gap-2 font-semibold ${
            isActive === 'knowledge' ? 'bg-primary text-white' : 'text-foreground'
          }`}
        >
          <Database />
          Knowledge Base
        </Button>
      </View>
      <Spreed orientation="horizontal" className="my-2" />
      <View className="mt-4">
        {isActive === 'overview' && (
          <>
                <View
                  key={i}
                  className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
                     backdrop-blur-md rounded-xl shadow-lg hover:scale-105 hover:shadow-xl 
                     transition-all duration-300 flex flex-col justify-center items-start gap-2"
                >
                  <Text className="text-base font-medium text-foreground/80">{item.label}</Text>
                  <Text className="text-3xl font-extrabold text-gradient-primary">
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>

            {/* Ras Kucing Populer */}
            <View
              className="p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 
                     backdrop-blur-md rounded-xl shadow-lg mt-6"
            >
              <Text className="font-bold text-xl text-gradient-primary mb-6">
                Ras Kucing Populer
              </Text>

              <View className="space-y-4">
                {Over.data?.data.ras_kucing_Populer?.map((r: any, idx: number) => {
                  const maxCount = Math.max(
                    ...Over.data.data.ras_kucing_Populer.map((x: any) => x.count)
                  );
                  const widthPercent = (r.count / maxCount) * 100;

                  return (
                    <View key={r._id} className="flex items-center gap-4 group">
                      {/* Nama Ras */}
                      <Text className="w-32 text-sm font-semibold text-foreground/90 group-hover:text-gradient-primary transition-colors">
                        {r._id}
                      </Text>

                      {/* Progress Bar */}
                      <div className="h-4 bg-white/10 rounded-full flex-1 overflow-hidden shadow-inner">
                        <div
                          className="h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>

                      {/* Jumlah */}
                      <Text className="w-12 text-right text-sm font-bold text-gradient-primary">
                        {r.count}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}

        {isActive === 'pengguna' && (
          <View className="p-6 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced overflow-x-auto">
            {/* Header */}
            <View className="flex justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gradient-primary">Daftar Pengguna</Text>
              <Button
                className="gradient-primary text-foreground px-6 py-3 rounded-full hover-lift hover:opacity-90 transition-all duration-300 flex items-center gap-2"
                onClick={() => setIsModal('Tambah-Pengguna')}
              >
                <Plus className="w-5 h-5" />
                Tambah Pengguna
              </Button>
            </View>

            {/* Table */}
            <table className="min-w-full border-collapse rounded-xl overflow-hidden card-glass shadow-enhanced">
              <thead className="bg-gradient-primary/20">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gradient-neutral">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gradient-neutral">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gradient-neutral">
                    Role
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gradient-neutral">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.data?.data?.map((user: any, index: number) => (
                  <tr
                    key={user._id}
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-white/5' : 'bg-white/0'
                    } hover:bg-[var(--shapeV1-parent)]/80 hover:scale-[1.01]`}
                  >
                    <td className="px-6 py-4 text-foreground">{user.namaLengkap}</td>
                    <td className="px-6 py-4 text-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-gradient-primary text-white'
                            : 'bg-white/20 text-foreground'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      <Link href={`/admin/admin-panel/detail-user/${user._id}`}>
                        <Button className="gradient-info text-info-foreground px-4 py-2 rounded-full hover-lift hover:opacity-90 transition-all duration-300 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Detail
                        </Button>
                      </Link>
                      <Button
                        className="gradient-warning text-warning-foreground px-4 py-2 rounded-full hover-lift hover:opacity-90 transition-all duration-300 flex items-center gap-2"
                        onClick={() => handleOpenEditModal(user)}
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        className="gradient-destructive text-destructive-foreground px-4 py-2 rounded-full hover-lift hover:opacity-90 transition-all duration-300 flex items-center gap-2"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </View>
        )}

        <PopUp isOpen={isModal === 'EditProfile'} onClose={() => setIsModal(null)}>
          <Container className="w-full p-6 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced">
            <View className="space-y-6">
              <Text className="text-2xl font-bold text-center text-gradient-primary animate-pulse">
                Edit Profil
              </Text>

              <View className="space-y-3">
                <Label className="text-base font-semibold text-gradient-neutral">
                  Nama Lengkap :
                </Label>
                <Input
                  value={formEditProfile.namaLengkap}
                  onChange={(e) =>
                    setFormEditProfile((prev) => ({
                      ...prev,
                      namaLengkap: e.target.value,
                    }))
                  }
                  placeholder="Masukkan nama lengkap"
                  className="card-glass rounded-lg p-3 h-full text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift  transition-all duration-300 animate-glow backdrop-blur-enhanced"
                />
              </View>

              <View className="space-y-3">
                <Label className="text-base font-semibold text-gradient-neutral">Email :</Label>
                <Input
                  value={formEditProfile.email}
                  onChange={(e) =>
                    setFormEditProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Masukkan email"
                  type="email"
                  className="card-glass rounded-lg p-3  h-full text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift  transition-all duration-300 animate-glow backdrop-blur-enhanced"
                />
              </View>

              <View className="space-y-3">
                <Label className="text-base font-semibold text-gradient-neutral">
                  Password (Kosongkan jika tidak ingin mengubah) :
                </Label>
                <Input
                  value={formEditProfile.password}
                  onChange={(e) =>
                    setFormEditProfile((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Masukkan password baru"
                  type="password"
                  className="card-glass rounded-lg p-3 h-full text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift  transition-all duration-300 animate-glow backdrop-blur-enhanced"
                />
              </View>

              {curentRole === 'ADMIN' && (
                <View className="space-y-3">
                  <Label className="text-base  font-semibold text-gradient-neutral">Role :</Label>
                  <Select
                    value={formEditProfile.role}
                    onValueChange={(value) =>
                      setFormEditProfile((prev) => ({
                        ...prev,
                        role: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full card-glass rounded-lg p-3 bg-gradient-primary/20 border-gray-200/50 hover-lift   transition-all duration-300 animate-glow backdrop-blur-enhanced">
                      <SelectValue placeholder="Pilih role" className="h-full w-full" />
                    </SelectTrigger>
                    <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                </View>
              )}

              <View className="flex justify-end gap-3 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsModal(null)}
                  className="gradient-neutral text-foreground px-6 py-3 rounded-full hover-lift hover:opacity-90 transition-all duration-300 animate-glow border-gray-200/50"
                >
                  <X className="w-4 h-4 mr-2 " />
                  Batal
                </Button>
                <Button
                  onClick={() => {
                    if (selectedUserId) {
                      handleEditUser(selectedUserId);
                    } else {
                      console.error('User ID is undefined');
                    }
                  }}
                  disabled={editUser.isPending}
                  className="gradient-primary text-primary-foreground px-6 py-3 rounded-full hover-lift hover:opacity-90 transition-all duration-300 animate-glow"
                >
                  {editUser.isPending ? (
                    <Fallback title="Tunggu Sebentar" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2 " />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
              </View>
            </View>
          </Container>
        </PopUp>

        <PopUp isOpen={isModal === 'Tambah-Pengguna'} onClose={() => setIsModal(null)}>
          <View className="w-full p-6 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced">
            <View className="flex justify-center items-center w-full">
              <div className="w-full space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="text" className="text-base font-semibold text-gradient-neutral">
                    Nama :
                  </Label>
                  <div className="relative">
                    <User className="  z-1 absolute left-3 top-1/2 -translate-y-1/2  w-5 h-5 " />
                    <Input
                      id="text"
                      type="text"
                      placeholder="Nama Anda"
                      className="pl-12 pr-4 py-3 h-full card-glass rounded-lg text-foreground  transition-all duration-300 z-1 "
                      onChange={(e) =>
                        setFormTambahaPengguna((prev) => ({
                          ...prev,
                          namaLengkap: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold text-gradient-neutral">
                    Email :
                  </Label>
                  <div className="relative">
                    <Mail className="z-1 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 " />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email Anda"
                      className="pl-12 pr-4 py-3 card-glass rounded-lg h-full text-foreground  transition-all duration-300 z-1 "
                      onChange={(e) =>
                        setFormTambahaPengguna((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-base font-semibold text-gradient-neutral"
                  >
                    Password :
                  </Label>
                  <div className="relative">
                    <Lock className="z-1 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 " />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password Anda"
                      className="pl-12 pr-12 py-3 card-glass h-full rounded-lg text-foreground  transition-all duration-300 z-1 "
                      onChange={(e) =>
                        setFormTambahaPengguna((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-all duration-300"
                    >
                      {showPassword ? (
                        <EyeOff size={20} className="" />
                      ) : (
                        <Eye size={20} className="" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gradient-neutral">Role :</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormTambahaPengguna((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger className="w-full card-glass rounded-lg p-3  transition-all duration-300  backdrop-blur-enhanced">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent className="card-glass bg-[var(--shapeV2-parent)]/80 backdrop-blur-enhanced rounded-lg shadow-enhanced">
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full gradient-primary text-primary-foreground px-6 py-3 rounded-full  hover:opacity-90 transition-all duration-300  font-semibold"
                  size="lg"
                  onClick={() => handleTambahPengguna()}
                  disabled={tambahPengguna.isPending}
                >
                  {tambahPengguna.isPending ? (
                    <Fallback title="Tunggu Sebentar" />
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2 " />
                      Daftar
                    </>
                  )}
                </Button>
              </div>
            </View>
          </View>
        </PopUp>

        {isActive === 'knowledge' && (
          <View className="w-full h-full">
            <Spreed orientation="horizontal" />
            <View className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-2 h-full">
              {data?.map((items, key) => {
                const id = (items._id ?? items.namaLayanan ?? key).toString();
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setSelectId(id);
                      setFormEditLayanan({
                        namaLayanan: items.namaLayanan,
                        deskripsi: items.deskripsi,
                        benefit: items.benefit,
                        harga: items.harga,
                        diskon: items.diskon || null,
                        durasiLayanan: items.durasiLayanan,
                        kategori: items.kategori,
                        status: items.status || 'Active',
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <LayananComponent
                      formEditLayanan={formEditLayanan}
                      setFormEditLayanan={setFormEditLayanan}
                      isPending={editLayananMutation.isPending}
                      isModal={childModal}
                      setIsModal={setChildModal}
                      formBikinKnowledge={formBikinKnowledge}
                      setFormBikinKnowledge={setFormBikinKnowledge}
                      onKnow={handleBikinKnow}
                      isActive={isActive}
                      data={items}
                      key={key}
                      isSelect={selectId === id}
                    />
                  </div>
                );
              })}
            </View>
          </View>
        )}

        {isActive === 'layanan' && (
          <View className="w-full h-full">
            <Button
              variant="default"
              className="gradient-primary"
              onClick={() => setIsModal('Tambah-Layanan')}
            >
              + Tambahah Layanan
            </Button>
            <Spreed orientation="horizontal" className="my-2" />
            <View className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-2 h-full">
              {data?.map((items, key) => {
                const id = (items._id ?? items.namaLayanan ?? key).toString();
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setSelectId(id);
                      setFormEditLayanan({
                        namaLayanan: items.namaLayanan,
                        deskripsi: items.deskripsi,
                        benefit: items.benefit,
                        harga: items.harga,
                        diskon: items.diskon || null,
                        durasiLayanan: items.durasiLayanan,
                        kategori: items.kategori,
                        status: items.status || 'Active',
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <LayananComponent
                      formEditLayanan={formEditLayanan}
                      setFormEditLayanan={setFormEditLayanan}
                      isPending={editLayananMutation.isPending}
                      isModal={childModal}
                      setIsModal={setChildModal}
                      onEdit={handleEdit}
                      data={items}
                      isActive={isActive}
                      onDelete={() => handleDelete(id)}
                      key={key}
                      isSelect={selectId === id}
                    />
                  </div>
                );
              })}
            </View>
          </View>
        )}
      </View>
      <PopUp isOpen={isModal === 'Tambah-Layanan'} onClose={() => setIsModal(null)}>
        <View className="w-full p-6 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced space-y-6">
          <Text className="text-2xl font-bold text-gradient-primary">Tambah Layanan Baru</Text>

          <View className="space-y-2">
            <Label className="text-base font-semibold text-gradient-neutral">Nama Layanan</Label>
            <Input
              value={formBikinLayanan.namaLayanan}
              onChange={(e) =>
                setFormBikinLayanan((prev) => ({
                  ...prev,
                  namaLayanan: e.target.value,
                }))
              }
              placeholder="Masukkan nama layanan"
              className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift transition-all duration-300 animate-glow backdrop-blur-enhanced"
            />
          </View>

          <View className="space-y-2">
            <Label className="text-base font-semibold text-gradient-neutral">Deskripsi</Label>
            <Textarea
              value={formBikinLayanan.deskripsi}
              onChange={(e) =>
                setFormBikinLayanan((prev) => ({
                  ...prev,
                  deskripsi: e.target.value,
                }))
              }
              placeholder="Masukkan deskripsi layanan"
              className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift transition-all duration-300 animate-glow backdrop-blur-enhanced"
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
                className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift transition-all duration-300 animate-glow backdrop-blur-enhanced"
              />
              <Button
                type="button"
                onClick={handleAddBenefit}
                className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift transition-all duration-300 animate-glow"
              >
                <Plus className="w-4 h-4 mr-2 " />
                Tambah
              </Button>
            </View>
            <View className="flex flex-wrap gap-2 mt-2">
              {formBikinLayanan.benefit.map((item, index) => (
                <View
                  key={index}
                  className="gradient-primary/20 px-3 py-1 rounded-full flex items-center gap-2 text-foreground text-sm animate-glow"
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
                value={formBikinLayanan.harga ?? ''}
                onChange={(e) =>
                  setFormBikinLayanan((prev) => ({
                    ...prev,
                    harga: e.target.value === '' ? null : Number(e.target.value),
                  }))
                }
                placeholder="Masukkan harga layanan"
                className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift transition-all duration-300 animate-glow backdrop-blur-enhanced"
              />
            </View>
            <View className="space-y-2">
              <Label className="text-base font-semibold text-gradient-neutral">Diskon (%)</Label>
              <Input
                type="number"
                value={formBikinLayanan.diskon ?? ''}
                onChange={(e) =>
                  setFormBikinLayanan((prev) => ({
                    ...prev,
                    diskon: e.target.value === '' ? null : Number(e.target.value),
                  }))
                }
                placeholder="Masukkan diskon"
                className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift transition-all duration-300 animate-glow backdrop-blur-enhanced"
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
                value={formBikinLayanan.durasiLayanan ?? ''}
                onChange={(e) =>
                  setFormBikinLayanan((prev) => ({
                    ...prev,
                    durasiLayanan: e.target.value === '' ? null : Number(e.target.value),
                  }))
                }
                placeholder="Masukkan durasi layanan"
                className="card-glass rounded-lg p-3 text-foreground bg-[var(--shapeV2-parent)]/50 border-gray-200/50 hover-lift transition-all duration-300 animate-glow backdrop-blur-enhanced"
              />
            </View>
            <View className="space-y-2">
              <Label className="text-base font-semibold text-gradient-neutral">Kategori</Label>
              <Select
                value={formBikinLayanan.kategori}
                onValueChange={(value) =>
                  setFormBikinLayanan((prev) => ({
                    ...prev,
                    kategori: value,
                  }))
                }
              >
                <SelectTrigger className="w-full card-glass rounded-lg p-3 bg-gradient-primary/20 border-gray-200/50 hover-lift transition-all duration-300 animate-glow backdrop-blur-enhanced">
                  <SelectValue placeholder="Pilih kategori" />
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
              variant="outline"
              onClick={() => setIsModal(null)}
              className="gradient-neutral text-foreground px-4 py-2 rounded-full hover-lift transition-all duration-300 animate-glow border-gray-200/50"
            >
              <X className="w-4 h-4 mr-2 " />
              Batal
            </Button>
            <Button
              onClick={() => handleCreateLayanan()}
              className="gradient-primary text-primary-foreground px-4 py-2 rounded-full hover-lift transition-all duration-300 animate-glow"
            >
              <Save className="w-4 h-4 mr-2 " />
              Simpan Layanan
            </Button>
          </View>
        </View>
      </PopUp>
    </Container>
  );
};

export default AdminPanelContent;
