import 'styles/index.scss';
//prime ui
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
//theme
import 'primereact/resources/themes/viva-light/theme.css';
import 'primereact/resources/themes/viva-dark/theme.css';
import 'primeicons/primeicons.css';
//
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { StoreContext } from 'shared';
import { appModel } from './model';
import { RootStoreProvider } from './config/storeProvider';
import { UIProvider } from './config/uiProvider';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

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
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          id="theme-link"
          href={`/themes/light_default.css`}
        />
      </head>
      <body className={poppins.className}>
        <RootStoreProvider>
          <UIProvider>{children}</UIProvider>
        </RootStoreProvider>
      </body>
    </html>
  );
}
