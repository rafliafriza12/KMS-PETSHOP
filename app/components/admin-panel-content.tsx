import { useState } from 'react';
import View from './ui/view';
import { Text } from './ui/Text';
import Container from './ui/container';
import { Button } from './ui/button';
import { ChartLine, Database, Settings, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Spreed from '../core/components/spreed';
const AdminPanelContent = () => {
  const [isActive, setIsActive] = useState<
    'overview' | 'pengguna' | 'knowledge' | 'layanan' | null
  >('overview');
  return (
    <Container as="section" className="bg-[var(--shapeV2-parent)] p-4 rounded-lg">
      <View className="flex justify-start items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setIsActive('overview')}
          className={`flex gap-2 ${
            isActive === 'overview' ? 'bg-primary text-white' : 'text-[var(--shapeV1-parent)]'
          }`}
        >
          <ChartLine />
          Overview
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('pengguna')}
          className={`flex gap-2 ${
            isActive === 'pengguna' ? 'bg-primary text-white' : 'text-[var(--shapeV1-parent)]'
          }`}
        >
          <User />
          Pengguna
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('layanan')}
          className={`flex gap-2 ${
            isActive === 'layanan' ? 'bg-primary text-white' : 'text-[var(--shapeV1-parent)]'
          }`}
        >
          <Settings />
          Layanan
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsActive('knowledge')}
          className={`flex gap-2 ${
            isActive === 'knowledge' ? 'bg-primary text-white' : 'text-[var(--shapeV1-parent)]'
          }`}
        >
          <Database />
          Knowledge Base
        </Button>
      </View>
      <Spreed orientation="horizontal" className="my-2" />
      {/* Component Tiap Button */}
      <View className="mt-4">
        <Text>SetUp Component</Text>
      </View>
    </Container>
  );
};

export default AdminPanelContent;
