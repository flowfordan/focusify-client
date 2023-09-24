import '../styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreContext } from 'shared';
import { appModel } from './model';
import { RootStoreProvider } from './config/storeProvider';
import { UIProviders } from './config/uiProvider';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //toggle theme
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <RootStoreProvider>
          <UIProviders>{children}</UIProviders>
        </RootStoreProvider>
      </body>
    </html>
  );
}
