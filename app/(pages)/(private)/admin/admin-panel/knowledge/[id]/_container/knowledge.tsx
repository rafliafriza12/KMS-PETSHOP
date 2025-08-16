'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import { useParams } from 'next/navigation';
import { useGetKnow } from '@/app/hooks/mutasion/knowleghe/useGetKnow';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';

const KnowlageContainer = () => {
  const params = useParams();
  const id = params.id as string;
  const Know = useGetKnow(id);
  const baseDta = Know.data?.data;

  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full">
        <View className="flex justify-center items-center flex-col">
          <Text>SetUp Dynamic</Text>
          <Text>{baseDta?.max_berat}</Text>
        </View>
      </Container>
    </HomeAdminLayout>
  );
};

export default KnowlageContainer;
