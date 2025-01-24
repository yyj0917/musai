'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = React.useMemo(() => new QueryClient(), []); // QueryClient 생성은 메모이제이션

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
