import Container from '@/app/components/ui/container';
import { Text } from '@/app/components/ui/Text';

const LoginContainer = () => {
  return (
    <Container as="main" className="h-full w-full">
      <Container className="flex justify-center items-center">
        <Text>Set Up Auth Login</Text>
      </Container>
    </Container>
  );
};

export default LoginContainer;
