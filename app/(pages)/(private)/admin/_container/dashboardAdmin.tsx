import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeAdminLayout from '@/app/core/layout/home-admin-layout';

const DashboardAdminContainer = () => {
  return (
    <HomeAdminLayout>
      <Container as="main" className="w-full h-full">
        <View className="flex justify-center items-center">
          <Text>Setup Page</Text>
        </View>
      </Container>
    </HomeAdminLayout>
  );
};
export default DashboardAdminContainer;
