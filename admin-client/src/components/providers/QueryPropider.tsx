import {
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const queryClient = new QueryClient({});

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
