import View from './ui/view';
import { Text } from './ui/Text';

const EmptyKucing = () => {
  return (
    <View className="w-full p-12 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced flex flex-col items-center justify-center space-y-4 animate-glow">
      <Text className="text-2xl font-bold text-gradient-primary text-center">
        Kamu Tidak Memiliki Kucing
      </Text>
      <Text className="text-base text-gradient-neutral text-center">
        Ayo segera daftarkan kucingmu dan nikmati semua fiturnya!
      </Text>
    </View>
  );
};

export default EmptyKucing;
