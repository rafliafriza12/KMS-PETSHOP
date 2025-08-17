import Container from './ui/container';
import View from './ui/view';
import { Text } from './ui/Text';
import { Calendar, Clock, Trash } from 'lucide-react';
import { KeranjangTypeProps } from '../types/props';
import { useAppSelector } from '../hooks/dispatch/dispatch';
import { getTime } from '../utils/string.format';
import { getDate } from '../utils/string.format';
import { useDeleteOne } from '../hooks/mutasion/keranjang/useDeleteOne';

const Keranjang: React.FC<KeranjangTypeProps> = ({ data }) => {
  const Delete = useDeleteOne(data._id);
  const handleDeleteOne = () => {
    Delete.mutate(data._id);
  };
  const Name = useAppSelector((state) => state.cat.selectedCat);
  return (
    <Container className="w-full p-4 bg-[var(--shapeV2-parent)] rounded-lg shadow-sm/20">
      <View className="flex justify-between items-center my-1">
        <Text className="text-sm font-semibold">{data.layanan.namaLayanan}</Text>
        <Trash color="red" className="cursor-pointer" onClick={() => handleDeleteOne()} />
      </View>
      <Text>Untuk: {Name?.namaKucing}</Text>
      <View className="flex justify-start items-start gap-4 mt-2">
        <View className="flex items-center gap-1">
          <Calendar />
          <Text>{getDate(data.jadwal)}</Text>
        </View>
        <View className="flex items-center gap-1">
          <Clock />
          <Text>{getTime(data.jadwal)}</Text>
        </View>
      </View>
      <View className="flex justify-between items-center mt-2">
        <Text>Duration: {data.layanan.durasiLayanan} Menit</Text>
        <Text>Rp: {data.layanan.harga.toLocaleString('id-ID')}</Text>
      </View>
    </Container>
  );
};

export default Keranjang;
