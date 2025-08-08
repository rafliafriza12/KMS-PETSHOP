import HeaderApp from "@/app/components/header-app";
import Container from "@/app/components/ui/container";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <HeaderApp />
      {children}
    </Container>
  );
}
