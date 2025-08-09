import HeaderAppHome from '@/app/components/header-app-home';
import Container from '@/app/components/ui/container';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <HeaderAppHome />
      {children}
    </Container>
  );
}
