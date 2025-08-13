import View from './ui/view';
import { Text } from './ui/Text';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { useGetProfile } from '../hooks/mutasion/auth/useGetProfile';
import { logout } from '../store/AuthSlice/authSlice';
import { useAppDispatch } from '../hooks/dispatch/dispatch';
import { useRouter } from 'next/navigation';

export default function Users() {
  const Profile = useGetProfile();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <View>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center items-center gap-1">
          <User />
          <Text>{Profile.data?.data.namaLengkap}</Text>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <button
            onClick={() => {
              router.push('/login');

              dispatch(logout());
            }}
            className="w-full"
          >
            <DropdownMenuItem className="text-sm font-bold">Logout</DropdownMenuItem>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
