import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import HomeUserLayout from '@/app/core/layout/home-user';

const DashboardUserContainer = () => {
  return (
    <HomeUserLayout>
      <Container as="main" className="w-full h-full">
        <View className="flex justify-center items-center">
          <Text>SetUp Page for DashboardUser</Text>
        </View>
      </Container>
    </HomeUserLayout>
  );
};

export default DashboardUserContainer;
