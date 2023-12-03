/* eslint-disable react/no-unknown-property */
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
import { StoreContext, ThemeProvider } from 'shared';
import { RootStoreProvider } from './config/storeProvider';
import { UIProvider } from './config/uiProvider';
import { AppVerBadge } from 'widgets/AppVerBadge';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FOCUSIFY | Focus on what matters',
  description: 'To-do list and pomodoro timer app to help you concentrate',
  applicationName: 'FOCUSIFY',
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
    'tasks',
    'pomodoro',
    'pomodoro timer',
    'pomodoro technique',
    'pomodoro timer app',
    'pomodoro timer online',
    'to-do',
    'to-do list',
    'to-do list app',
    'to-do list online',
    'to-do list app',
    'to-do list app online',
    'to-do list app free',
    'to-do list app free online',
    'to-do list app free online',
    'to-do list app free online',
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
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <link
          rel="stylesheet"
          id="theme-link"
          href={`/themes/light_default.css`}
        />
        <meta property="og:title" content="FOCUSIFY | Focus on what matters" />
        <meta property="og:url" content="https://focusify.kitezh.xyz" />
        <meta
          property="og:description"
          content="To-do list and pomodoro timer app to help you concentrate"
        />
        <meta
          property="og:image"
          content="https://focusify.kitezh.xyz/meta/main_og.png"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={poppins.className}>
        <RootStoreProvider>
          <UIProvider>
            <ThemeProvider>
              {children}
              <AppVerBadge />
            </ThemeProvider>
          </UIProvider>
        </RootStoreProvider>
      </body>
    </html>
  );
}
