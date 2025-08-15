'use client';
import ToggleTheme from './ui/toggle';
import View from './ui/view';
import { Label } from '@radix-ui/react-label';
import { Cat } from 'lucide-react';
import { Button } from './ui/button';
import { NavbarAdminData } from '../config/app-config';
import Link from 'next/link';
import Chart from './Chart';
import Users from './users';
import { useIsMobile } from '../core/mobile/useMobile';
import SideBarAdmin from '../core/components/side-bar-admin';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '../hooks/dispatch/dispatch';
import { clearSelectedCat } from '../store/CatSlice/catSlice';

export default function HeaderAppAdmin() {
  const { isMobile } = useIsMobile();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <nav className="flex justify-between items-center w-full p-2">
      <View className="flex justify-center items-center gap-2">
        {isMobile ? (
          <SideBarAdmin />
        ) : (
          <div className="flex justify-center items-center gap-1 cursor-pointer">
            <Cat className="text-[var(--shapeV1-parent)]" />
            <Label className=" text-sm lg:text-2xl font-bold">KMS PETSHOP</Label>
          </div>
        )}

        {!isMobile && (
          <View className="flex justify-center items-center gap-2">
            {NavbarAdminData.map((items, key) => {
              const isActive = pathname === items.href;
              return (
                <Link href={items.href} key={key}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => {
                      if (!items.href.includes('/admin/layanan')) {
                        dispatch(clearSelectedCat());
                      }
                    }}
                    className={`flex  font-semibold ${
                      isActive ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    <items.icon />
                    {items.title}
                  </Button>
                </Link>
              );
            })}
          </View>
        )}
      </View>
      <View className="flex justify-center items-center gap-2">
        <Button variant="ghost" className="">
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
