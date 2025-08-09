import HeaderApp from '@/app/components/header-app';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <HeaderApp />
      {children}
    </main>
  );
}
