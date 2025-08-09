import HeaderAppAdmin from '@/app/components/header-admin';
export default function HomeAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderAppAdmin />
      {children}
    </>
  );
}
