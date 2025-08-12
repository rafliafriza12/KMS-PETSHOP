'use client';

import { ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet';
import UseTooltip from '../hooks/tooltip/tooltip/tooltip';
import Spreed from '../core/components/spreed';
import { Text } from './ui/Text';
import Keranjang from './keranjang';
import { KeranjangData } from '../config/component-config';
import View from './ui/view';
import { Button } from './ui/button';

const Chart: React.FC = () => {
  // Hitung total layanan, durasi, dan pembayaran
  const totalLayanan = KeranjangData.length;
  // const totalPembayaran = KeranjangData.reduce((sum, item) => sum + (item.harga ?? 0), 0);

  // // Asumsi duration disimpan dalam menit
  // const totalMenit = KeranjangData.reduce((sum, item) => sum + (item.durationMenit ?? 0), 0);
  // const jam = Math.floor(totalMenit / 60);
  // const menit = totalMenit % 60;
  // const estimasiWaktu = `${jam} jam ${menit} menit`;

  return (
    <Sheet>
      <SheetTrigger>
        <UseTooltip content="Keranjang">
          <ShoppingCart />
        </UseTooltip>
      </SheetTrigger>

      <SheetContent className="w-full h-full flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={36} />
            <Text className="font-semibold">Keranjang ({totalLayanan})</Text>
          </SheetTitle>
          <Spreed orientation="horizontal" />
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <SheetDescription className="flex flex-col gap-4 p-4">
            {KeranjangData.length === 0 ? (
              <View className="flex flex-col items-center justify-center gap-2 mt-10">
                <ShoppingCart size={86} />
                <Text className="font-semibold text-lg">Keranjang Masih Kosong</Text>
                <Text className="font-light text-sm">Tambah Layanan Untuk Kucing Anda</Text>
              </View>
            ) : (
              KeranjangData.map((items, key) => <Keranjang key={key} data={items} />)
            )}
          </SheetDescription>
        </div>

        {KeranjangData.length > 0 && (
          <div className="bg-[var(--shapeV2-parent)] p-4 shadow-lg border-t">
            <View className="flex justify-between">
              <Text className="font-semibold">Total Layanan:</Text>
              <Text className="font-bold">{totalLayanan} layanan</Text>
            </View>
            <View className="flex justify-between">
              <Text className="font-semibold">Estimasi Waktu:</Text>
              {/* <Text className="font-bold">{estimasiWaktu}</Text> */}
            </View>
            <View className="flex justify-between mt-2">
              <Text className="font-semibold text-lg">Total Pembayaran:</Text>
              {/* <Text className="font-bold text-lg text-primary">
          Rp {totalPembayaran.toLocaleString('id-ID')}
        </Text> */}
            </View>

            <Button className="w-full mt-4 bg-primary text-white py-3 rounded-lg">
              Proses Pembayaran
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Chart;
