import View from './ui/view';
import { Text } from './ui/Text';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import Link from 'next/link';
import { useGetProfile } from '../hooks/mutasion/auth/useGetProfile';

export default function Users() {
  const Profile = useGetProfile();
  return (
    <View>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center items-center gap-1">
          <User />
          <Text>{Profile.data?.data.namaLengkap}</Text>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Sementara */}
          <Link href="/login">
            <DropdownMenuItem className="text-sm font-bold">Logout</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
