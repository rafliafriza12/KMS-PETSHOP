'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import HomeUserLayout from '@/app/core/layout/home-user';
import Spreed from '@/app/core/components/spreed';
import CatData from '@/app/components/cat-data';
import FilterLayanan from '@/app/components/filter-layanan';
import LayananComponent from '@/app/components/layanan';
import { LayananAppData } from '@/app/config/component-config';

const LayananContainer = () => {
  return (
    <HomeUserLayout>
      <Container as="main" className="w-full h-full">
        <Spreed orientation="horizontal" />

        <View className="flex justify-center items-center gap-4 p-4 mt-2 flex-wrap">
          <CatData />
          <FilterLayanan />
          <View className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 w-full gap-2">
            {LayananAppData.map((items, key) => (
              <LayananComponent data={items} key={key} />
            ))}
          </View>
        </View>
      </Container>
    </HomeUserLayout>
  );
};

export default LayananContainer;
