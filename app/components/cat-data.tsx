import View from './ui/view';
import { Text } from './ui/Text';
import Container from './ui/container';
import { Cat } from 'lucide-react';

const CatData: React.FC = () => {
  return (
    <Container className="w-full ">
      <View className="flex justify-start items-center gap-2">
        <View className="rounded-full bg-[var(--shapeV1-parent)] p-2 z-0">
          <Cat className=" w-5 h-5 z-1" />
        </View>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-2xl font-bold">Layanan Untuk Luna</Text>
          <View className="flex justify-center items-center gap-1">
            <Text className="text-lg">Ras</Text>
            <Text className="text-lg">Umur</Text>
            <Text className="text-lg">Berat Badan</Text>
          </View>
        </View>
      </View>
      <View className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 mt-4 bg-[var(--shapeV2-parent)]/60 rounded-sm p-4 text-center">
        <Container className="flex justify-center">
          <View className="flex justify-center items-center flex-col">
            <Text className="text-lg font-bold">8</Text>
            <Text>Layanan Tersedia</Text>
          </View>
        </Container>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-lg font-semibold">6</Text>
          <Text>Sangat Direkomendasikan</Text>
        </View>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-lg font-bold">1</Text>
          <Text>Promo Tersedia</Text>
        </View>
        <View className="flex justify-center items-center flex-col">
          <Text className="text-lg font-semibold">990</Text>
          <Text>Total Menit</Text>
        </View>
      </View>
    </Container>
  );
};

export default CatData;
