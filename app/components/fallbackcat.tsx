import View from './ui/view';
import { Text } from './ui/Text';
import { Cat, Plus } from 'lucide-react';
import { Button } from './ui/button';

const EmptyKucing = ({ onKucing }: { onKucing: () => void }) => {
  return (
    <View className="w-full p-16 bg-gradient-primary/10 card-glass rounded-xl shadow-enhanced flex flex-col items-center justify-center space-y-6 animate-glow animate-scale-in backdrop-blur-enhanced">
      <Cat className="w-16 h-16 text-primary " />
      <Text className="text-3xl font-bold text-gradient-primary text-center">
        Kamu Tidak Memiliki Kucing
      </Text>
      <Text className="text-base text-foreground text-center max-w-md">
        Ayo segera daftarkan kucingmu dan nikmati semua fiturnya!
      </Text>
      <Button
        className="gradient-primary text-primary-foreground px-6 py-3 rounded-full hover-lift hover:scale-105 transition-all duration-300 animate-glow font-semibold"
        onClick={() => onKucing()}
      >
        <Plus className="w-5 h-5 mr-2 " />
        Daftarkan Kucingmu
      </Button>
    </View>
  );
};

export default EmptyKucing;
