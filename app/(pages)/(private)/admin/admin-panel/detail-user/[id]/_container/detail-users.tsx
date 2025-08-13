'use client';
import Container from '@/app/components/ui/container';
import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import { useParams } from 'next/navigation';

const DetailUsersContainer = () => {
  return (
    <Container as="main">
      <View>
        <Text>SetUp Page</Text>
      </View>
    </Container>
  );
};

export default DetailUsersContainer;
