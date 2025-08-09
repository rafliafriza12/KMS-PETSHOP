import { NavbarAppType } from '../types/components';
import { Cat, Settings, ShoppingBag } from 'lucide-react';

export const NavbarAppData: NavbarAppType[] = [
  {
    title: 'Home',
    href: '',
  },
  {
    title: 'Layanan',
    href: '',
  },
];

export const NavbarUserData: NavbarAppType[] = [
  {
    title: 'Dashboard',
    href: '',
    icon: Cat,
  },
  {
    title: 'Layanan',
    href: '',
    icon: Settings,
  },
  {
    title: 'Pesanan Saya',
    href: '',
    icon: ShoppingBag,
  },
];

export const NavbarAdmonData: NavbarAppType[] = [
  {
    title: 'Dashboard',
    href: '',
    icon: Cat,
  },
  {
    title: 'Admin Panel',
    href: '',
    icon: Settings,
  },
];
