import Container from "@/app/components/ui/container";
import { Text } from "@/app/components/ui/Text";
import HomeLayout from "@/app/core/layout/home-layout";

const HomeContainer = () => {
  return (
    <HomeLayout>
      <Container className="w-full h-full">
        <Container className="flex justify-center items-center">
          <Text>Set Up Paage</Text>
        </Container>
      </Container>
    </HomeLayout>
  );
};

export default HomeContainer;
