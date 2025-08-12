import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet';
import { Text } from '@/app/components/ui/Text';
import UseTooltip from '@/app/hooks/tooltip/tooltip/tooltip';
import Spreed from './spreed';
import { Cat } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { NavbarUserData } from '@/app/config/app-config';
import View from '@/app/components/ui/view';
import { usePathname } from 'next/navigation';

const SideBarUser: React.FC = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <UseTooltip content="Menu">
          <div className="flex justify-center items-center gap-1 cursor-pointer">
            <Cat className="text-[var(--shapeV1-parent)]" />
            <Label className=" text-sm lg:text-2xl font-bold">KMS PETSHOP</Label>
          </div>
        </UseTooltip>
      </SheetTrigger>

      <SheetContent className="w-full h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Menu size={26} />
            <Text className="font-semibold">Navigation</Text>
          </SheetTitle>
          <Spreed orientation="horizontal" />
          <SheetDescription className="w-full flex justify-center items-start flex-col">
            {NavbarUserData.map((items, key) => {
              const isActive = pathname === items.href;
              return (
                <Link key={key} href={items.href} className="w-full p-2 flex flex-col gap-4">
                  <View
                    className={`flex justify-start items-center gap-1 p-2 rounded-lg ${
                      isActive ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    <items.icon />
                    <Text className="font-semibold text-lg">{items.title}</Text>
                  </View>
                  <Spreed orientation="horizontal" />
                </Link>
              );
            })}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarUser;
