'use client';
import { NextUIProvider } from '@nextui-org/react';
import ReduxProvider from './ReduxProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </NextUIProvider>
  );
}