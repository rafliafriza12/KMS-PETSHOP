import HeaderAppUser from '@/app/components/header-user';

export default function HomeUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderAppUser />
      {children}
    </>
  );
}
