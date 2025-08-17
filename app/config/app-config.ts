import { NavbarAppType } from '../types/components';
import { Cat, Settings, ShoppingBag } from 'lucide-react';

export const NavbarAppData: NavbarAppType[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Layanan',
    href: '/login',
  },
];

export const NavbarUserData: NavbarAppType[] = [
  {
    title: 'Dashboard',
    href: '/users',
    icon: Cat,
  },
  {
    title: 'Layanan',
    href: '/users/layanan',
    icon: Settings,
  },
  {
    title: 'Pesanan Saya',
    href: '/users/pesanan',
    icon: ShoppingBag,
  },
];

export const NavbarAdminData: NavbarAppType[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Cat,
  },
  {
    title: 'Layanan',
    href: '/admin/layanan',
    icon: Settings,
  },
  {
    title: 'Pesanan Saya',
    href: '/admin/pesanan',
    icon: ShoppingBag,
  },
  {
    title: 'Admin Panel',
    href: '/admin/admin-panel',
    icon: Settings,
  },
];
