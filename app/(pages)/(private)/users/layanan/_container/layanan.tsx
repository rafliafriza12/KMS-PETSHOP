'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import HomeUserLayout from '@/app/core/layout/home-user';
import Spreed from '@/app/core/components/spreed';
import CatData from '@/app/components/cat-data';
import FilterLayanan from '@/app/components/filter-layanan';
import LayananComponent from '@/app/components/layanan';
import { LayananAppData } from '@/app/config/component-config';
import { Text } from '@/app/components/ui/Text';
import { useState } from 'react';
import { useAppSelector } from '@/app/hooks/dispatch/dispatch';
const LayananContainer = () => {
  const [filter, setFilter] = useState<string>('all');
  const selectData = useAppSelector((state) => state.cat.selectedCat);
  const filteredData =
    filter === 'all'
      ? LayananAppData
      : LayananAppData.filter((item) => item.kategori.toLowerCase() === filter.toLowerCase());

  if (!selectData) {
    return (
      <HomeUserLayout>
        <Container as="main" className="w-full h-full  justify-center items-center flex flex-col">
          <Text className="text-lg font-semibold">
            Pilih kucing terlebih dahulu untuk melihat layanan yang tersedia.
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
          <CatData data={selectData} />
          <FilterLayanan onChange={setFilter} />
          <View className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 w-full gap-6 ">
            {filteredData.map((items) => (
              <LayananComponent data={items} key={items._id} />
            ))}
          </View>
        </View>
      </Container>
    </HomeUserLayout>
  );
};

export default LayananContainer;
