import View from './ui/view';
import { Text } from './ui/Text';

const Informasion: React.FC<{ isSelect: boolean; catName?: string }> = ({ isSelect, catName }) => {
  return (
    <View className="w-full">
      {isSelect ? (
        <View className="flex justify-center items-start flex-col border border-[var(--shapeV1-child)] bg-[var(--shapeV1-parent)]/20 p-2 rounded-lg">
          <Text className="text-lg lg:text-2xl font-semibold">Kucing Dipilih: {catName}</Text>
          <Text className="text-sm lg:2xl font-light">
            Klik tab "Layanan" untuk melihat layanan perawatan yang direkomendasikan untuk{' '}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Informasion;
