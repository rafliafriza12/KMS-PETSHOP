'use client';

import {
  Banknote,
  ChevronRight,
  Clock,
  CreditCard,
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
import View from './ui/view';
import { Button } from './ui/button';
import PopUp from '../core/components/pop-up';
import { useEffect, useState } from 'react';
import { PaymentMethodCard } from '../core/components/paymentMethot';
import { useGetChart } from '../hooks/mutasion/keranjang/useGetCart';
import { useDeleteAll } from '../hooks/mutasion/keranjang/useDeleteAll';
import Fallback from './ui/fallback';
import { KeranjangType } from '../types/components';
import { menitKeJam } from '../utils/string.format';
import { useCheckout } from '../hooks/mutasion/pesanan/useCheckout';
import { FormCheckOutSchema, FormPembayaranShema } from '../types/form';
import { any } from 'zod';
import { Input } from './ui/input';
import { usePembayaran } from '../hooks/mutasion/pembayaran/usePembayaran';

const Chart: React.FC = () => {
  const checkout = useCheckout({
    onAfterSuccess: () => {
      setIsModal(null);
    },
  });
  const [isModal, setIsModal] = useState<'pembayaran' | null>(null);
  const [isSelect, setIsSelect] = useState<
    'Bayar di Tempat' | 'Transfer Bank' | 'GoPay' | 'OVO' | 'DANA' | 'Kartu Kredit/Debit'
  >('Bayar di Tempat');
  const Chart = useGetChart();
  const data: KeranjangType[] = Chart.data?.data || [];
  const totalHarga = (Chart.data as any)?.totalHarga || 0;
  const DeleteAll = useDeleteAll();
  const totalLayanan = data.length;
  const totalWaktu = data.reduce((sum: number, item: any) => sum + (item.estimasiWaktu || 0), 0);
  const id = Chart.data?.data?._id;
  const [formCheckOut, setFormCheckOut] = useState<FormCheckOutSchema>({
    metodePembayaran: '',
  });

  useEffect(() => {
    if (id) {
      console.log('id', id);
    }
  }, [id]);

  const [formPembayaran, setFormPembayaran] = useState<FormPembayaranShema>({
    amount: null,
    metodePembayaran: '',
    pesananId: '',
  });

  const pay = usePembayaran();
  const handlePay = () => {
    return pay.mutate(formPembayaran);
  };

  useEffect(() => {
    setFormPembayaran((prev) => ({
      ...prev,
      metodePembayaran: isSelect || '',
      pesananId: id || '',
    }));
  }, [isSelect, id]);

  const handleCheckout = () => {
    return checkout.mutate(formCheckOut);
  };

  useEffect(() => {
    setFormCheckOut((prev) => ({
      ...prev,
      metodePembayaran: isSelect || '',
    }));
  }, [isSelect]);

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
            {data.length === 0 ? (
              <View className="flex flex-col items-center justify-center gap-2 mt-10">
                <ShoppingCart size={86} />
                <Text className="font-semibold text-lg">Keranjang Masih Kosong</Text>
                <Text className="font-light text-sm">Tambah Layanan Untuk Kucing Anda</Text>
              </View>
            ) : (
              data.map((items: any, key: any) => <Keranjang key={key} data={items} />)
            )}
          </SheetDescription>
        </div>

        {data.length > 0 && (
          <div className="bg-[var(--shapeV2-parent)] p-4 shadow-lg border-t">
            <Button
              className="w-full mb-4 flex "
              onClick={DeleteAll.mutate}
              disabled={DeleteAll.isPending}
            >
              {DeleteAll.isPending ? <Fallback title="Tunggu Sebentar" /> : 'Hapus Semua'}
            </Button>
            <View className="flex justify-between">
              <Text className="font-semibold">Total Layanan:</Text>
              <Text className="font-bold">{totalLayanan} layanan</Text>
            </View>
            <View className="flex justify-between">
              <Text className="font-semibold">Estimasi Waktu:</Text>
              <Text className="font-bold">{totalWaktu} Menit</Text>
            </View>
            <View className="flex justify-between mt-2">
              <Text className="font-semibold text-lg">Total Pembayaran:</Text>
              <Text className="font-bold text-lg text-primary">
                Rp {totalHarga.toLocaleString('id-ID')}
              </Text>
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
            <View className="my-2 bg-[var(--shapeV2-parent)] p-2 rounded-sm">
              <Text className="font-semibold">Ringkasa Pesanan :</Text>
              <View className="flex justify-between items-center">
                <View className="flex-col flex gap-1">
                  {data.map((items, key) => (
                    <Text className="text-sm" key={key}>
                      {items.layanan.namaLayanan}
                    </Text>
                  ))}
                </View>
                <View className="flex flex-col gap-1">
                  {data.map((items, key) => (
                    <Text className="text-sm" key={key}>
                      Rp.{items.layanan.harga.toLocaleString('id-Id')}
                    </Text>
                  ))}
                </View>
              </View>
              <Spreed orientation="horizontal" className="my-1" />

              <View className="flex justify-between">
                <Text>SubTotal:</Text>
                <Text>{totalHarga.toLocaleString('id-Id')}</Text>
              </View>
              <Spreed orientation="horizontal" className="my-1" />
            </View>

            <View className="flex justify-between items-center">
              <Text className="text-lg font-semibold">Total :</Text>
              <Text className="font-bold text-lg text-primary">
                Rp {totalHarga.toLocaleString('id-ID')}
              </Text>
            </View>
            <View className="p-2 bg-[var(--shapeV1-parent)] rounded-sm">
              <View className="flex gap-2">
                <Clock />
                <Text>Estimasi Penyelesaian</Text>
              </View>
              <View className="flex justify-start items-start flex-col">
                <Text>Semua layanan diperkirakan selesai pada saat kami memulai layanan</Text>
                <Text>Total Durasi: {menitKeJam(totalWaktu)} </Text>
              </View>
            </View>
          </View>
          <Text className="font-semibold mt-4">Metode Pembayaran :</Text>
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
          {/* Pembayaran */}
          {/* <View className="flex flex-col gap-4 mt-4">
            <View>
              <View className="flex justify-start items-center gap-1 mb-2">
                <CreditCard />
                <Text className="font-semibold"> Masukan Jumlah : </Text>
              </View>
              <Input
                placeholder="Masukkan nama lengkap"
                type="number"
                inputMode="decimal"
                className="w-full p-2 border rounded-md"
                onChange={(e) =>
                  setFormPembayaran((prev) => ({
                    ...prev,
                    amount: e.target.value === '' ? null : Number(e.target.value),
                  }))
                }
              />
            </View>
          </View> */}
          <Spreed orientation="horizontal" className="my-4" />
          <Button
            className="w-full"
            disabled={checkout.isPending}
            onClick={() => {
              handlePay();
              handleCheckout();
            }}
          >
            {checkout.isPending ? <Fallback title="Tunggu Sebentar" /> : 'Bayar Sekarang'}
          </Button>
        </PopUp>
      </SheetContent>
    </Sheet>
  );
};

export default Chart;
