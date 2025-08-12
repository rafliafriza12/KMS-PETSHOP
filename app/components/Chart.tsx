'use client';

import {
  Banknote,
  ChevronRight,
  CreditCard,
  MapPinHouse,
  NotebookTabs,
  Phone,
  ShoppingCart,
  Smartphone,
  User,
} from 'lucide-react';
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
import PopUp from '../core/components/pop-up';
import { useState } from 'react';
import { PaymentMethodCard } from '../core/components/paymentMethot';
import { Input } from './ui/input';

const Chart: React.FC = () => {
  const [isModal, setIsModal] = useState<'pembayaran' | null>(null);
  const [isSelect, setIsSelect] = useState<
    'Bayar di Tempat' | 'Transfer Bank' | 'GoPay' | 'OVO' | 'DANA' | 'Kartu Kredit/Debit' | null
  >(null);

  const totalLayanan = KeranjangData.length;
  // const totalPembayaran = KeranjangData.reduce((sum, item) => sum + (item.harga ?? 0), 0);
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

      <SheetContent className="w-full h-full flex flex-col overflow-y-scroll">
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

            <Button
              onClick={() => setIsModal('pembayaran')}
              className="w-full mt-4 bg-primary text-white py-3 rounded-lg"
            >
              Proses Pembayaran
            </Button>
          </div>
        )}
        <PopUp
          isOpen={isModal === 'pembayaran'}
          onClose={() => setIsModal(null)}
          className="w-full"
        >
          <View className="flex justify-between items-center">
            <Text className="text-lg font-bold">Pembayaran</Text>
            <ChevronRight
              className="text-foreground cursor-pointer"
              onClick={() => setIsModal(null)}
            />
          </View>
          <Spreed orientation="horizontal" className="my-4" />
          <View className="w-full p-2">
            <Text className="font-semibold">Ringkasa Pesanan :</Text>
            <View className="flex justify-between items-center">
              <Text className="text-sm">Data Perawatan :</Text>
              <Text className="text-sm">Pricing</Text>
            </View>
          </View>
          <Text className="font-semibold mt-4">Metode Pembayaran</Text>
          <View className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2">
            <PaymentMethodCard
              icon={<Banknote />}
              selected={isSelect === 'Bayar di Tempat'}
              title="Bayar di Tempat"
              description="Pembayaran tunai saat layanan selesai"
              onClick={() => setIsSelect('Bayar di Tempat')}
            />

            <PaymentMethodCard
              icon={<CreditCard />}
              selected={isSelect === 'Transfer Bank'}
              title="Transfer Bank"
              description="Transfer ke rekening BCA/Mandiri"
              adminFee="Rp 2.500"
              onClick={() => setIsSelect('Transfer Bank')}
            />

            <PaymentMethodCard
              icon={<Smartphone />}
              selected={isSelect === 'GoPay'}
              title="GoPay"
              description="Pembayaran melalui aplikasi Gojek"
              onClick={() => setIsSelect('GoPay')}
            />

            <PaymentMethodCard
              icon={<Smartphone />}
              selected={isSelect === 'OVO'}
              title="OVO"
              description="Pembayaran melalui aplikasi OVO"
              onClick={() => setIsSelect('OVO')}
            />

            <PaymentMethodCard
              icon={<Smartphone />}
              selected={isSelect === 'DANA'}
              title="DANA"
              description="Pembayaran melalui aplikasi DANA"
              onClick={() => setIsSelect('DANA')}
            />

            <PaymentMethodCard
              icon={<CreditCard />}
              selected={isSelect === 'Kartu Kredit/Debit'}
              title="Kartu Kredit/Debit"
              description="Visa, Mastercard, atau kartu debit"
              adminFee="Rp 5.000"
              onClick={() => setIsSelect('Kartu Kredit/Debit')}
            />
          </View>
          <Text>Informasi Pemesanan</Text>
          <View className="flex flex-col gap-4 mt-4">
            <View>
              <View className="flex justify-start items-center gap-1 mb-2">
                <User />
                <Text className="font-semibold">Nama Lengkap :</Text>
              </View>
              <Input placeholder="Masukkan nama lengkap" className="w-full p-2 border rounded-md" />
            </View>
            <View>
              <View className="flex justify-start items-center gap-1 mb-2">
                <Phone />
                <Text className="font-semibold">Nomor Telepon :</Text>
              </View>
              <Input placeholder="Contoh: 08123456789" className="w-full p-2 border rounded-md" />
            </View>
            <View>
              <View className="flex justify-start items-center gap-1 mb-2">
                <MapPinHouse />
                <Text className="font-semibold">Alamat :</Text>
              </View>
              <Input
                placeholder="Alamat lengkap untuk pickup/delivery"
                className="w-full p-2 border rounded-md"
              />
            </View>
            <View>
              <View className="flex justify-start items-center gap-1 mb-2 ">
                <NotebookTabs />
                <Text className="font-semibold">Catatan Tambahan :</Text>
              </View>
              <Input
                placeholder="Catatan khusus untuk layanan (opsional)"
                className="w-full p-2 border rounded-md"
              />
            </View>
            <Button className="w-full">Bayar Sekarang</Button>
          </View>
        </PopUp>
      </SheetContent>
    </Sheet>
  );
};

export default Chart;
