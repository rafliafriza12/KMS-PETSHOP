import { View, Clock2, CircleAlert, CircleCheckBig, CreditCard } from 'lucide-react';
import { Text } from './ui/Text';

const HeaderPesananApp: React.FC<{ count: any[] }> = ({ count }) => {
  const summary = count.reduce(
    (acc, pesanan: any) => {
      pesanan.items.forEach((item: any) => {
        if (item.statusPesanan === 'PENDING') {
          acc.pending += 1;
          acc.aktif += 1;
        }
        if (item.statusPesanan === 'PROSES') {
          acc.proses += 1;
          acc.aktif += 1;
        }
        if (item.statusPesanan === 'SELESAI') {
          acc.selesai += 1;
        }
        acc.total_transaksi += item.harga;
      });
      return acc;
    },
    {
      aktif: 0,
      pending: 0,
      proses: 0,
      selesai: 0,
      total_transaksi: 0,
    }
  );

  return (
    <View className="w-full">
      <View className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 p-2">
        {/* Pesanan Aktif */}
        <View className="flex justify-center items-center w-full gap-2 border rounded-lg p-4 shadow-lg">
          <View className="bg-[#DBEAFE] p-2 rounded-full">
            <Clock2 size={40} className="text-[#2563EB]" />
          </View>
          <View className="flex justify-start items-start flex-col">
            <Text className="font-bold">{summary.aktif}</Text>
            <Text className="font-semibold">Pesanan Aktif</Text>
          </View>
        </View>

        {/* Sedang Diproses */}
        <View className="flex justify-center items-center w-full gap-2 border rounded-lg p-4 shadow-lg">
          <View className="bg-[#F3E8FF] p-2 rounded-full">
            <CircleAlert size={40} className="text-[#9333EA]" />
          </View>
          <View className="flex justify-start items-start flex-col">
            <Text className="font-bold">{summary.proses}</Text>
            <Text className="font-semibold">Sedang Di Proses</Text>
          </View>
        </View>

        {/* Selesai */}
        <View className="flex justify-center items-center w-full gap-2 border rounded-lg p-4 shadow-lg">
          <View className="bg-[#DCFCE7] p-2 rounded-full">
            <CircleCheckBig size={40} className="text-[#2CAD5C]" />
          </View>
          <View className="flex justify-start items-start flex-col">
            <Text className="font-bold">{summary.selesai}</Text>
            <Text className="font-semibold">Selesai</Text>
          </View>
        </View>

        {/* Total Transaksi */}
        <View className="flex justify-center items-center w-full gap-2 border rounded-lg p-4 shadow-lg">
          <View className="bg-[#E0E7FF] p-2 rounded-full">
            <CreditCard size={40} className="text-[#4F46E5]" />
          </View>
          <View className="flex justify-start items-start flex-col">
            <Text className="font-bold">Rp {summary.total_transaksi.toLocaleString('id-ID')}</Text>
            <Text className="font-semibold">Total Transaksi</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderPesananApp;
