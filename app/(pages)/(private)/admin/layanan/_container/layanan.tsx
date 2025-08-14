'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import HomeUserLayout from '@/app/core/layout/home-user';
import Spreed from '@/app/core/components/spreed';
import CatData from '@/app/components/cat-data';
import FilterLayanan from '@/app/components/filter-layanan';
import LayananComponent from '@/app/components/layanan';
import { Text } from '@/app/components/ui/Text';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/hooks/dispatch/dispatch';
import { Cat } from 'lucide-react';
import { useGetRekomendasiLayanan } from '@/app/hooks/mutasion/layanan/useGetRekomendasi';
import { useGetLayanan } from '@/app/hooks/mutasion/layanan/useGetLayanan';
import { FormAddToChartSchema } from '@/app/types/form';
import { useAddCart } from '@/app/hooks/mutasion/keranjang/useAddCart';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';
const LayananContainer = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectId, setSelectId] = useState<string | null>(null);
  const selectData = useAppSelector((state) => state.cat?.selectedCat);
  const { data } = useGetRekomendasiLayanan(selectData?._id);
  const { data: dataAll } = useGetLayanan();
  const filterAllData =
    filter === 'all' ? dataAll : dataAll?.filter((item: any) => item.kategori.toLowerCase());
  const rekomendasi = data?.data || [];
  const filteredData =
    filter === 'all'
      ? rekomendasi
      : rekomendasi.filter(
          (item: any) => item.layanan.kategori.toLowerCase() === filter.toLowerCase()
        );

  const [childModal, setChildModal] = useState<'Keranjang' | 'Edit' | 'Knowledge' | null>(null);

  useEffect(() => {
    setFormAddToChart((prev) => ({
      ...prev,
      layananId: selectId || '',
    }));
  }, [selectId]);

  const [formAddToChart, setFormAddToChart] = useState<FormAddToChartSchema>({
    kucingId: selectData?._id || '',
    layananId: '',
    jadwal: '',
  });

  const AddToChart = useAddCart();
  const handleAddtoChart = () => {
    if (!selectId) {
      console.error('Pilih layanan terlebih dahulu');
      return;
    }

    AddToChart.mutate(formAddToChart);
  };
  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full">
        <Spreed orientation="horizontal" />

        <View className="flex justify-center items-center gap-4 p-4 mat-2 flex-wrap">
          <CatData countLayanan={filterAllData} countRekomendasi={rekomendasi} data={selectData} />
          <FilterLayanan count={rekomendasi} onChange={setFilter} />
          <View className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 w-full gap-6 ">
            {filteredData?.map((items: any, key: any) => {
              const id = items?._id || items?.layanan?._id || key.toString();
              return (
                <div
                  key={key}
                  onClick={() => {
                    setSelectId(id);
                  }}
                >
                  <LayananComponent
                    formAddToChart={formAddToChart}
                    setFormAddToChart={setFormAddToChart}
                    onAddToChart={handleAddtoChart}
                    isSelect={selectId === id}
                    setIsModal={setChildModal}
                    isModal={childModal}
                    data={items}
                  />
                </div>
              );
            })}
          </View>
        </View>
      </Container>
    </HomeAdminLayout>
  );
};

export default LayananContainer;
