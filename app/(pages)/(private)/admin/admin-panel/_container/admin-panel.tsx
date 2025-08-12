'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';
import AdminPanelContent from '@/app/components/admin-panel-content';

const AdminPanelContainer = () => {
  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full p-2">
        <View className="flex justify-start items-start flex-col">
          <Text className="font-bold text-2xl">Admin Panel</Text>
          <Text className="font-semibold text-lg">Kelola sistem dan monitor performa aplikasi</Text>
        </View>
        <AdminPanelContent />
      </Container>
    </HomeAdminLayout>
  );
};

export default AdminPanelContainer;
