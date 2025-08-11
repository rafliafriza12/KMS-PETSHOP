import { ShoppingCart } from 'lucide-react';
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
const Chart: React.FC = () => {
  // Wait For Data App
  return (
    <Sheet>
      <SheetTrigger>
        <UseTooltip content="Chart">
          <ShoppingCart />
        </UseTooltip>
      </SheetTrigger>

      <SheetContent className="w-full h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={36} />
            <Text className="font-semibold">Keranjang</Text>
          </SheetTitle>
          <Spreed orientation="horizontal" />
          <SheetDescription className="w-full min-h-screen flex justify-center items-center flex-col">
            <ShoppingCart size={86} />
            <Text className="font-semibold text-lg">Keranjang Masi Kosong</Text>
            <Text className="font-semibold text-lg">Tambah Layanan Untuk Kucing Anda</Text>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Chart;
