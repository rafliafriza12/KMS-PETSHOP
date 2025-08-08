import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getMe } from '@/services/auth/auth.store';
import { TUser } from '@/services/auth/auth.type';
import { CircleUserRound, History, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface UserDropdownProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const userDropdownItems: UserDropdownProps[] = [
  {
    title: 'Profile',
    icon: <CircleUserRound className="text-black" />,
    href: '/profile',
  },
  {
    title: 'History Forum',
    icon: <History className="text-black" />,
    href: '/history-forum',
  },
  {
    title: 'Logout',
    icon: <LogOut className="text-black" />,
    href: '/logout',
  },
];

export default function UserDropdown() {
  const [user, setUser] = useState<TUser | null | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getMe();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user?.photoUrl ?? '/avatars/1.png'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={user?.photoUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <DropdownMenuLabel className="flex flex-col gap-2">
            <span className="text-xs text-gray-500">{user?.username}</span>
            <span className="text-sm font-semibold">{user?.name}</span>
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />

        {userDropdownItems.map((item) => (
          <DropdownMenuItem key={item.title} className="mb-2">
            <Link href={item.href} className="flex items-center gap-2 text-black">
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
