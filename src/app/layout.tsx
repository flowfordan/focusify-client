'use client';
import '../styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreContext } from 'shared';
import { appModel } from './model';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Focusify',
  description: 'Focus away',
  applicationName: 'Focusify',
  authors: {
    name: 'Daniil Rychkov (flowfordan)',
    url: 'flowfordan.kitezh.xyz',
  },
  keywords: [
    'focus',
    'focusify',
    'concentration',
    'flow',
    'focus away',
    'focusify app',
  ],
  referrer: 'origin',
};

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={appModel}>{children}</StoreContext.Provider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //toggle theme
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <RootStoreProvider>{children}</RootStoreProvider>
      </body>
    </html>
  );
}
