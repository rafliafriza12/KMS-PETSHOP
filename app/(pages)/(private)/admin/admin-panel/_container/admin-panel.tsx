'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';
import AdminPanelContent from '@/app/components/admin-panel-content';

const AdminPanelContainer = () => {
  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full p-6 md:p-10 space-y-8">
        {/* Header Section */}
        <View
          className="relative w-full rounded-2xl p-8 md:p-10 card-glass shadow-enhanced overflow-hidden
                        bg-gradient-to-r from-indigo-500/80 via-purple-500/70 to-pink-500/70 
                        dark:from-indigo-700/70 dark:via-purple-800/70 dark:to-pink-700/70"
        >
          {/* Glow / Background Accent */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-transparent 
                          dark:from-indigo-600/20 dark:via-purple-600/20 blur-2xl -z-10"
          />

          <Text className="font-bold text-3xl md:text-4xl text-foreground/80 dark:text-gray-100 drop-shadow-md">
            Admin Panel
          </Text>
          {/* <Text className="font-medium text-lg text-white/90 dark:text-gray-200 mt-2">
            Kelola sistem dan monitor performa aplikasi
          </Text> */}
        </View>

        {/* Main Content */}
        <View className="w-full">
          <AdminPanelContent />
        </View>
      </Container>
    </HomeAdminLayout>
  );
};

export default AdminPanelContainer;
