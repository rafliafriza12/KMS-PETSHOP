'use client';
import { Cat } from 'lucide-react';
import Container from './ui/container';
import ToggleTheme from './ui/toggle';
import View from './ui/view';
import { Label } from './ui/label';
import UseTooltip from '../hooks/tooltip/tooltip/tooltip';
import { User } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useIsMobile } from '../core/mobile/useMobile';
import { NavbarAppData } from '../config/app-config';

export default function HeaderAppHome() {
  const { isMobile } = useIsMobile();
  return (
    <nav className="flex justify-between items-center w-full p-2 ">
      <View className="flex justify-center items-center gap-1">
        <Cat className="text-[var(--shapeV1-parent)]" />
        <Label className="text-2xl font-bold">KMS PETSHOP</Label>
      </View>
      {!isMobile && (
        <View className="flex gap-4">
          {NavbarAppData.map((items, key) => (
            <Link key={key} href={items.href}>
              <Button variant="ghost" className="font-bold">
                {items.title}
              </Button>
            </Link>
          ))}
        </View>
      )}
      <Container className="flex justify-center items-center gap-2">
        <UseTooltip content="Theme">
          <ToggleTheme />
        </UseTooltip>
        <View className="flex justify-center items-center">
          <Link href="/login">
            <Button variant="ghost">
              <User className="scale-90" />
              <Label>Login</Label>
            </Button>
          </Link>
        </View>
      </Container>
    </nav>
  );
}
