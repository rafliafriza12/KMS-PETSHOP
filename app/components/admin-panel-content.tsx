import { useEffect, useState } from 'react';
import View from './ui/view';
import { Text } from './ui/Text';
import Container from './ui/container';
import { Button } from './ui/button';
import { ChartLine, Database, Settings, User } from 'lucide-react';
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
import { FormBikinLayananScham, FormEditProfileSchema } from '../types/form';
import { useCreateLayanan } from '../hooks/mutasion/layanan/useCreateLayanan';
import { useAlert } from '../hooks/alert/costum-alert';
import { useEditLayanan } from '../hooks/mutasion/layanan/useEditLayanan';
import { useEditProfile } from '../hooks/mutasion/auth/useEditProfile';
import { useAppSelector } from '../hooks/dispatch/dispatch';
import Fallback from './ui/fallback';

const AdminPanelContent = () => {
  const curentRole = useAppSelector((state) => state.auth.currentUser?.user.role);
  const alert = useAlert();
  const createlayanan = useCreateLayanan();
  const Over = useOverview();
  const users = useGetUsers();
  const deleteUsers = useDeleteUser();
  const { data } = useGetLayanan();
  const [selectId, setSelectId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const editLayananMutation = useEditLayanan(selectId || '');
  const [isActive, setIsActive] = useState<
    'overview' | 'pengguna' | 'knowledge' | 'layanan' | null
  >('overview');
  const [isModal, setIsModal] = useState<'Tambah-Layanan' | 'EditProfile' | null>(null);

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
    status: '',
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
      console.log('Edit profile selesai dan sukses!');
    },
  });

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
    <Container as="section" className="bg-[var(--shapeV2-child)] p-4 rounded-lg ">
      <View className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setIsActive('overview')}
          className={`flex gap-2 ${
            isActive === 'overview' ? 'bg-primary text-white' : 'text-[var(--shapeV1-parent)]'
          }`}
        >
          <ChartLine />
          Overview
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('pengguna')}
          className={`flex gap-2 ${
            isActive === 'pengguna' ? 'bg-primary text-white' : 'text-[var(--shapeV1-parent)]'
          }`}
        >
          <User />
          Pengguna
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('layanan')}
          className={`flex gap-2 ${
            isActive === 'layanan' ? 'bg-primary text-white' : 'text-[var(--shapeV1-parent)]'
          }`}
        >
          <Settings />
          Layanan
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('knowledge')}
          className={`flex gap-2 ${
            isActive === 'knowledge' ? 'bg-primary text-white' : 'text-[var(--shapeV1-parent)]'
          }`}
        >
          <Database />
          Knowledge Base
        </Button>
      </View>
      <Spreed orientation="horizontal" className="my-2" />

      <View className="mt-4">
        {isActive === 'overview' && (
          <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <View className="p-4 bg-[var(--shapeV2-parent)] rounded-lg shadow flex justify-start items-start gap-2 flex-col">
              <Text>Total Pengguna :</Text>
              <Text className="text-xl font-bold">{Over.data?.data.total_users ?? 0}</Text>
            </View>

            <View className="p-4 bg-[var(--shapeV2-parent)] rounded-lg shadow flex justify-start items-start gap-2 flex-col">
              <Text>Profil Kucing :</Text>
              <Text className="text-xl font-bold">{Over.data?.data.total_kucing ?? 0}</Text>
            </View>

            <View className="p-4 bg-[var(--shapeV2-parent)] rounded-lg shadow flex justify-start items-start gap-2 flex-col">
              <Text>Rekomendasi Dibuat :</Text>
              <Text className="text-xl font-bold">{Over.data?.data.total_layanan ?? 0}</Text>
            </View>

            <View className="p-4 bg-[var(--shapeV2-parent)] rounded-lg shadow flex justify-start items-start gap-2 flex-col">
              <Text>Tingkat Kepuasan :</Text>
              {/* <Text className="text-xl font-bold">94%</Text> */}
            </View>

            <View className="col-span-2 p-4 bg-[var(--shapeV2-parent)] rounded-lg shadow">
              <Text className="font-bold mb-2">Ras Kucing Populer</Text>
              {Over.data?.data.ras_kucing_Populer?.map((r: any) => (
                <View key={r._id} className="flex items-center gap-2 mb-1">
                  <Text className="w-32">{r._id}</Text>
                  <div className="h-2 bg-gray-200 rounded flex-1">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{
                        width: `${
                          (r.count /
                            Math.max(
                              ...Over.data.data.ras_kucing_Populer.map((x: any) => x.count)
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <Text className="w-12 text-right">{r.count}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {isActive === 'pengguna' && (
          <View className="p-4 overflow-x-auto">
            <Text className="text-lg font-bold mb-4">Daftar Pengguna :</Text>
            <table className="min-w-full border rounded-lg mt-4">
              <thead className="bg-[var(--shapeV2-parent)]">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">Nama</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
                  <th className="px-4 py-2 text-center text-sm font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.data?.data?.map((user: any) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-200 hover:bg-[var(--shapeV1-parent)]"
                  >
                    <td className="px-4 py-2">{user.namaLengkap}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      {/* Dynamic Untuk Detail */}
                      <Link href={`/admin/admin-panel/detail-users`}>
                        <Button className="bg-blue-500 text-white px-3 py-1 rounded-sm">
                          Detail
                        </Button>
                      </Link>
                      <Button
                        className="bg-blue-500 text-white px-3 py-1 rounded-sm"
                        onClick={() => handleOpenEditModal(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 text-white px-3 py-1 rounded-sm"
                        onClick={() => handleDeleteUser(user._id)}
                      >
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
          <Container className="w-full h-full">
            <View className=" space-y-4">
              <Text className="text-xl font-bold text-center">Edit Profil</Text>

              <View className="space-y-2">
                <Label>Nama Lengkap :</Label>
                <Input
                  value={formEditProfile.namaLengkap}
                  onChange={(e) =>
                    setFormEditProfile((prev) => ({
                      ...prev,
                      namaLengkap: e.target.value,
                    }))
                  }
                  placeholder="Masukkan nama lengkap"
                />
              </View>

              <View className="space-y-2">
                <Label>Email :</Label>
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
                />
              </View>

              <View className="space-y-2">
                <Label>Password (Kosongkan jika tidak ingin mengubah) :</Label>
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
                />
              </View>

              {curentRole === 'ADMIN' && (
                <View className="space-y-2">
                  <Label>Role :</Label>
                  <Select
                    value={formEditProfile.role}
                    onValueChange={(value) =>
                      setFormEditProfile((prev) => ({
                        ...prev,
                        role: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                </View>
              )}

              <View className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsModal(null)}>
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
                >
                  {editUser.isPending ? <Fallback title="Tunggu Sebentar" /> : 'Simpan Perubahan'}
                </Button>
              </View>
            </View>
          </Container>
        </PopUp>

        {isActive === 'knowledge' && (
          <View>
            <Text>Knowledge Base</Text>
            {/* Map data knowledge base */}
          </View>
        )}

        {isActive === 'layanan' && (
          <View>
            <Button variant="ghost" onClick={() => setIsModal('Tambah-Layanan')}>
              + Tambahah Layanan
            </Button>
            <Spreed orientation="horizontal" className="my-2" />
            <View className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-2">
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
                      onEdit={handleEdit}
                      data={items}
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
        <View className="w-full p-6 space-y-4">
          <Text className="text-xl font-bold">Tambah Layanan Baru</Text>

          <View className="space-y-2">
            <Label>Nama Layanan</Label>
            <Input
              value={formBikinLayanan.namaLayanan}
              onChange={(e) =>
                setFormBikinLayanan((prev) => ({
                  ...prev,
                  namaLayanan: e.target.value,
                }))
              }
            />
          </View>

          <View className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea
              value={formBikinLayanan.deskripsi}
              onChange={(e) =>
                setFormBikinLayanan((prev) => ({
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
              {formBikinLayanan.benefit.map((item, index) => (
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
                value={formBikinLayanan.harga ?? ''}
                onChange={(e) =>
                  setFormBikinLayanan((prev) => ({
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
                value={formBikinLayanan.diskon ?? ''}
                onChange={(e) =>
                  setFormBikinLayanan((prev) => ({
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
                value={formBikinLayanan.durasiLayanan ?? ''}
                onChange={(e) =>
                  setFormBikinLayanan((prev) => ({
                    ...prev,
                    durasiLayanan: e.target.value === '' ? null : Number(e.target.value),
                  }))
                }
              />
            </View>

            <View className="space-y-2">
              <Label>Kategori</Label>
              <Select
                value={formBikinLayanan.kategori}
                onValueChange={(value) =>
                  setFormBikinLayanan((prev) => ({
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
              value={formBikinLayanan.status}
              onValueChange={(value) =>
                setFormBikinLayanan((prev) => ({
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
            <Button variant="outline" onClick={() => setIsModal(null)}>
              Batal
            </Button>
            <Button onClick={() => handleCreateLayanan()}>Simpan Layanan</Button>
          </View>
        </View>
      </PopUp>
    </Container>
  );
};

export default AdminPanelContent;
