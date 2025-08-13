'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import Spreed from '@/app/core/components/spreed';
import FilterLayanan from '@/app/components/filter-layanan';
import LayananComponent from '@/app/components/layanan';
import { LayananAppData } from '@/app/config/component-config';
import { useState } from 'react';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';
const LayananContainer = () => {
  const [filter, setFilter] = useState<string>('all');
  const filteredData =
    filter === 'all'
      ? LayananAppData
      : LayananAppData.filter((item) => item.kategori.toLowerCase() === filter.toLowerCase());
  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full">
        <Spreed orientation="horizontal" />
        <View className="flex justify-center items-center gap-4 p-4 mt-2 flex-wrap">
          <FilterLayanan onChange={setFilter} />
          <View className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 w-full gap-6 ">
            {filteredData.map((items) => (
              <LayananComponent data={items} key={items._id} />
            ))}
          </View>
        </View>
      </Container>
    </HomeAdminLayout>
  );
};

export default LayananContainer;
