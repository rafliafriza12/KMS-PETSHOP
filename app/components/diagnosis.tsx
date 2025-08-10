import View from './ui/view';
import { Cat, Calendar, Weight, Activity, Heart } from 'lucide-react';
import { Text } from './ui/Text';
import Container from './ui/container';
import Spreed from '@/app/core/components/spreed';
import { DiagnosisAppTypeProps } from '../types/props';
const Diagnosis: React.FC<DiagnosisAppTypeProps & { isSelect: boolean }> = ({ data, isSelect }) => {
  const handleBaghe = (text: string) => {
    if (text === 'Rendah') {
      return (
        <div className="text-sm font-light px-2 py-1 bg-green-500 text-white rounded-lg">
          Rendah
        </div>
      );
    } else if (text === 'Sedang') {
      return (
        <div className="text-sm font-light px-2 py-1 bg-yellow-500 text-white rounded-lg">
          Sedang
        </div>
      );
    } else if (text === 'Tinggi') {
      return (
        <div className="text-sm font-light px-2 py-1 bg-red-500 text-white rounded-lg">Tinggi</div>
      );
    }
    return null;
  };

  return (
    <View
      className={`flex flex-col border rounded-xl ${
        isSelect ? 'border-[var(--shapeV1-parent)]' : 'border'
      }`}
    >
      <View className="flex justify-between items-center w-full p-3 border-b">
        <View className="flex items-center gap-3">
          <View className="rounded-full bg-[var(--shapeV1-parent)] p-2 z-0">
            <Cat className=" w-5 h-5 z-1" />
          </View>
          <View className="flex flex-col">
            <Text className="text-sm font-semibold">{data.nama}</Text>
            <Text className="text-sm font-semibold">{data.ras}</Text>
          </View>
        </View>
        {isSelect ? (
          <View>
            <Text className="text-xs font-medium p-2 bg-[var(--shapeV1-parent)] rounded-lg">
              Dipilih
            </Text>
          </View>
        ) : null}
      </View>

      <Container className="p-3 w-full">
        <View className="flex justify-between items-center w-full">
          <View className="flex items-center gap-1">
            <Calendar className="w-4 h-4 " />
            <Text className="text-sm font-light">{data.tanggal}</Text>
          </View>
          <View className="flex items-center gap-1">
            <Weight className="w-4 h-4 " />
            <Text className="text-sm font-light">{data.berat} Kg</Text>
          </View>
        </View>

        <View className="flex justify-between items-center mt-4 w-full">
          <View className="flex items-center gap-1">
            <Activity className="w-4 h-4 " />
            <Text className="text-sm font-light">{data.aktivitas}</Text>
          </View>
          {handleBaghe(data.aktivitas)}
        </View>

        <Spreed className="mt-6" />
      </Container>

      <View className="w-full px-3 py-2 flex items-center gap-2 border-t">
        <Heart className="w-4 h-4 text-red-500" />
        <Text className="text-sm font-medium">Kondisi Kesehatan : {data.kesehatan}</Text>
      </View>
    </View>
  );
};

export default Diagnosis;
