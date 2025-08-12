import Container from './ui/container';
import View from './ui/view';
import { Text } from './ui/Text';
import { Calendar, Clock, Trash } from 'lucide-react';
import { KeranjangTypeProps } from '../types/props';

const Keranjang: React.FC<KeranjangTypeProps> = ({ data }) => {
  return (
    <Container className="w-full p-4 bg-[var(--shapeV2-parent)] rounded-lg shadow-sm/20">
      <View className="flex justify-between items-center my-1">
        <Text className="text-sm font-semibold">{data.title}</Text>
        <Trash color="red" className="cursor-pointer" />
      </View>
      <Text>Untuk: {data.nama}</Text>
      <View className="flex justify-start items-start gap-4 mt-2">
        <View className="flex items-center gap-1">
          <Calendar />
          <Text>Date: {data.tanggal}</Text>
        </View>
        <View className="flex items-center gap-1">
          <Clock />
          <Text>Time: {data.jam}</Text>
        </View>
      </View>
      <View className="flex justify-between items-center mt-2">
        <Text>Duration: {data.duration}</Text>
        <Text>Rp: {data.harga}</Text>
      </View>
    </Container>
  );
};

export default Keranjang;
