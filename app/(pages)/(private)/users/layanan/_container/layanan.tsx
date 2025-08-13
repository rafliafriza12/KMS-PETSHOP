'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import HomeUserLayout from '@/app/core/layout/home-user';
import Spreed from '@/app/core/components/spreed';
import CatData from '@/app/components/cat-data';
import FilterLayanan from '@/app/components/filter-layanan';
import LayananComponent from '@/app/components/layanan';
import { Text } from '@/app/components/ui/Text';
import { useState } from 'react';
import { useAppSelector } from '@/app/hooks/dispatch/dispatch';
import { Cat } from 'lucide-react';
import { useGetLayanan } from '@/app/hooks/mutasion/layanan/useGetLayanan';
const LayananContainer = () => {
  const [filter, setFilter] = useState<string>('all');
  const selectData = useAppSelector((state) => state.cat.selectedCat);
  const { data } = useGetLayanan();

  const filteredData =
    filter === 'all'
      ? data
      : data?.filter((item) => item.kategori.toLowerCase() === filter.toLowerCase());

  if (!selectData) {
    return (
      <HomeUserLayout>
        <Container as="main" className="w-full h-full  justify-center items-center flex flex-col">
          <Cat size={100} />
          <Text className="text-lg font-semibold">Pilih kucing terlebih dahulu</Text>
          <Text className="text-lg font-semibold">
            Silakan pilih profil kucing dari dashboard untuk melihat layanan yang direkomendasikan.
          </Text>
        </Container>
      </HomeUserLayout>
    );
  }
  return (
    <HomeUserLayout>
      <Container as="main" className="w-full h-full">
        <Spreed orientation="horizontal" />

        <View className="flex justify-center items-center gap-4 p-4 mt-2 flex-wrap">
          <CatData count={data} data={selectData} />
          <FilterLayanan onChange={setFilter} />
          <View className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 w-full gap-6 ">
            {filteredData?.map((items, key) => (
              <LayananComponent data={items} key={key} />
            ))}
          </View>
        </View>
      </Container>
    </HomeUserLayout>
  );
};

export default LayananContainer;
