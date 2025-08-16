'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import { useParams } from 'next/navigation';
import { useGetProfileById } from '@/app/hooks/mutasion/auth/useGetProfileById';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';

const DetailUsersContainer = () => {
  const params = useParams();
  const id = params.id as string;
  const data = useGetProfileById(id);

  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full p-2 ">
        <View className="space-y-4 bg-[var(--shapeV1-parent)] p-4 rounded-lg ">
          <Text className="text-2xl font-bold">Detail User</Text>

          <View className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <View>
              <Text className="font-semibold">ID :</Text>
              <Text>{data.data?.data._id}</Text>
            </View>

            <View>
              <Text className="font-semibold">Nama Lengkap:</Text>
              <Text>{data.data?.data.namaLengkap}</Text>
            </View>

            <View>
              <Text className="font-semibold">Email:</Text>
              <Text>{data.data?.data.email}</Text>
            </View>

            <View>
              <Text className="font-semibold">Role:</Text>
              <Text>{data.data?.data.role}</Text>
            </View>

            <View>
              <Text className="font-semibold">Created At :</Text>
              <Text>{new Date(data?.data?.data.createdAt).toLocaleString()}</Text>
            </View>

            <View>
              <Text className="font-semibold">Updated At :</Text>
              <Text>{new Date(data.data?.data.updatedAt).toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </Container>
    </HomeAdminLayout>
  );
};

export default DetailUsersContainer;
