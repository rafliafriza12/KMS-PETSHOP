'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import { useParams } from 'next/navigation';
import { useGetKnow } from '@/app/hooks/mutasion/knowleghe/useGetKnow';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';
import { useDeleteKnow } from '@/app/hooks/mutasion/knowleghe/useDeleteKnow';
import { Label } from '@radix-ui/react-label';
import Spreed from '@/app/core/components/spreed';
import { Button } from '@/app/components/ui/button';

const KnowlageContainer = () => {
  const params = useParams();
  const id = params.id as string;
  const Know = useGetKnow(id);
  const baseDta = Know.data?.data;

  const Delete = useDeleteKnow(id);

  const handleDelete = () => {
    Delete.mutate(id);
  };

  if (!baseDta) {
    return (
      <HomeAdminLayout>
        <Container as="main" className="w-full h-full">
          <View className="flex justify-center items-center min-h-screen">
            <View className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></View>
          </View>
        </Container>
      </HomeAdminLayout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getConditionColor = (condition: string) => {
    const colors = {
      diabetes: 'bg-red-100 text-red-800 border-red-200',
      'dental issues': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      default: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[condition as keyof typeof colors] || colors.default;
  };

  const getRasColor = (index: number) => {
    const colors = [
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-pink-100 text-pink-800 border-pink-200',
    ];
    return colors[index % colors.length];
  };

  const getActivityColor = (activity: string) => {
    const colors = {
      rendah: 'bg-orange-100 text-orange-800 border-orange-200',
      sedang: 'bg-teal-100 text-teal-800 border-teal-200',
      tinggi: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[activity as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full min-h-screen ">
        <View className="max-w-6xl mx-auto px-4 py-8">
          <View className="text-center mb-8 flex flex-col">
            <Text className="text-3xl font-bold mb-2">Detail Layanan Perawatan Kucing</Text>
            <Label className="">Informasi lengkap layanan ID: {baseDta._id.slice(-8)}</Label>
          </View>

          <View className="bg-[var(--shapeV2-parent)] rounded-2xl shadow-xl border  overflow-hidden">
            <View className="bg-gradient-to-r from-[var(--shapeV1-parent)] to-[var(--shapeV1-child)]  p-6">
              <View className="flex items-center justify-between">
                <View className="flex justify-start items-start flex-col">
                  <Label className="text-xl  text-blue-100 font-semibold">
                    Layanan KMS PETSHOP
                  </Label>
                  <Label className="text-blue-100 mt-1">ID: {baseDta.layananId}</Label>
                </View>
                <View className="text-right text-sm text-blue-100">
                  <p>Dibuat: {formatDate(baseDta.createdAt)}</p>
                  <p>Diperbarui: {formatDate(baseDta.updatedAt)}</p>
                </View>
              </View>
            </View>

            <View className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <View className="space-y-6">
                <View className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Spesifikasi Fisik
                  </h3>

                  <View className="grid grid-cols-2 gap-4">
                    <View className=" rounded-lg p-4 shadow-sm flex justify-center items-center flex-col">
                      <Text className="text-sm  text-gray-600 mb-1">Berat Minimum</Text>
                      <Label className="text-2xl font-bold text-blue-600">
                        {baseDta.min_berat} kg
                      </Label>
                    </View>
                    <View className=" rounded-lg p-4 shadow-sm flex justify-center items-center flex-col">
                      <Label className="text-sm  text-gray-600 mb-1">Berat Maksimum</Label>
                      <Label className="text-2xl font-bold text-blue-600">
                        {baseDta.max_berat} kg
                      </Label>
                    </View>
                    <View className=" rounded-lg p-4 shadow-sm flex justify-center items-center flex-col">
                      <Text className="text-sm text-gray-600 mb-1">Umur Minimum</Text>
                      <Text className="text-2xl font-bold text-purple-600">
                        {baseDta.min_umur} tahun
                      </Text>
                    </View>
                    <View className=" rounded-lg p-4 shadow-sm flex justify-center items-center flex-col">
                      <Text className="text-sm text-gray-600 mb-1">Umur Maksimum</Text>
                      <Text className="text-2xl font-bold text-purple-600">
                        {baseDta.max_umur} tahun
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Kondisi yang Ditangani
                  </h3>
                  <View className="flex flex-wrap gap-2">
                    {baseDta.kondisi.map((condition: any, index: any) => (
                      <span
                        key={index}
                        className={`px-3 py-2 rounded-lg text-sm font-medium border-2 ${getConditionColor(
                          condition
                        )} capitalize transition-transform hover:scale-105`}
                      >
                        {condition.replace('_', ' ')}
                      </span>
                    ))}
                  </View>
                </View>
              </View>

              <View className="space-y-6">
                <View className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Ras yang Didukung
                  </h3>
                  <View className="grid grid-cols-1 gap-3">
                    {baseDta.ras.map((breed: any, index: any) => (
                      <View
                        key={index}
                        className={`px-4 py-3 rounded-lg border-2 ${getRasColor(
                          index
                        )} font-medium text-center capitalize transition-all hover:shadow-md hover:-translate-y-1`}
                      >
                        {breed.replace('_', ' ')}
                      </View>
                    ))}
                  </View>
                </View>

                <View className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Tingkat Aktivitas
                  </h3>
                  <View className="flex flex-wrap gap-3">
                    {baseDta.tingkatAktivitas.map((activity: any, index: any) => (
                      <span
                        key={index}
                        className={`px-4 py-3 rounded-lg text-sm font-medium border-2 ${getActivityColor(
                          activity
                        )} capitalize transition-all hover:shadow-md hover:scale-105`}
                      >
                        {activity}
                      </span>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <Spreed orientation="horizontal" />
            <View className="from-[var(--shapeV1-parent)] to-[var(--shapeV1-child)] px-6 py-">
              <View className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 "></span>
                  Status: Aktif
                </span>
                <span>
                  Total ras didukung: {baseDta.ras.length} | Kondisi ditangani:{' '}
                  {baseDta.kondisi.length}
                </span>
              </View>
            </View>
          </View>
          <View className="mt-2">
            <Button className="font-semibold" onClick={() => handleDelete()}>
              Hapus Knowledge
            </Button>
          </View>
        </View>
      </Container>
    </HomeAdminLayout>
  );
};

export default KnowlageContainer;
