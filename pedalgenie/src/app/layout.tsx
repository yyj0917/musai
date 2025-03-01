import type { Metadata } from 'next';
import './globals.css';
import { ChannelProvider } from '@/components/providers/channel-provider';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from '@/components/providers/query-provider';

export const metadata: Metadata = {
  title: 'MUSAI',
  description: 'MUSAI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Pretendard 웹폰트 CDN 설정 */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
          crossOrigin="anonymous"
        />
        {/* viewport 설정 */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"
        />
      </head>
      {/* 데스크탑 & 태블릿에서는 375px고정, 모바일에서는 폰 화면에 따라 조정 */}
      <body className="h-[100dvh] min-w-[360px] max-w-[415px] lg:max-w-[375px] mx-auto bg-white scroll-smooth">
        <QueryProvider>
          <ChannelProvider>{children}</ChannelProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
