'use client';

import { themeConfig } from '@/configs/theme.config';
import { Toaster } from '@/core/components/toaster';
import { useTheme } from '@/core/providers/theme.provider';
import { ReactQueryClientProvider } from '@/pkg/react-query/query-client.pkg';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextTopLoader from 'nextjs-toploader';
export default function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      <Toaster />
      <NextTopLoader color={themeConfig[theme].primary.foreground} showSpinner={false} />
      <ReactQueryClientProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryClientProvider>
    </>
  );
}
