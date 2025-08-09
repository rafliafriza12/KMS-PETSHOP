import HeaderAppAuth from '@/app/components/header-app-auth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <HeaderAppAuth />
      {children}
    </main>
  );
}
