'use client';
import ToggleTheme from './ui/toggle';
import View from './ui/view';
import { Label } from '@radix-ui/react-label';
import { Cat } from 'lucide-react';
import { Button } from './ui/button';
import { NavbarAdmonData } from '../config/app-config';
import Link from 'next/link';
import Chart from './Chart';
import Users from './users';
import { useIsMobile } from '../core/mobile/useMobile';

export default function HeaderAppAdmin() {
  const { isMobile } = useIsMobile();
  return (
    <nav className="flex justify-between items-center w-full p-2">
      <View className="flex justify-center items-center gap-2">
        <View className="flex justify-center items-center gap-1">
          <Cat className="text-[var(--shapeV1-parent)]" />
          <Label className="text-sm lg:text-2xl font-bold">KMS PETSHOP</Label>
        </View>
        {!isMobile && (
          <View className="flex justify-center items-center">
            {NavbarAdmonData.map((items, key) => (
              <Link href={items.href} key={key}>
                <Button variant="ghost" className="flex gap-3 font-semibold">
                  <items.icon />
                  {items.title}
                </Button>
              </Link>
            ))}
          </View>
        )}
      </View>
      <View className="flex justify-center items-center gap-2">
        <Button variant="ghost">
          <Chart />
        </Button>
        <Button variant="ghost">
          <Users />
        </Button>
        <ToggleTheme />
      </View>
    </nav>
  );
}
