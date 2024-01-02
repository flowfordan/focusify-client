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
import { HeadProvider, StoreContext, ThemeProvider } from 'shared';
import { RootStoreProvider } from './config/storeProvider';
import { UIProvider } from './config/uiProvider';
import { AppVerBadge } from 'widgets/AppVerBadge';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FOCUSIFY | Focus on what matters',
  description:
    'An online Pomodoro Timer and Task Manager to help you focus and boost your productivity',
  applicationName: 'FOCUSIFY',
  authors: {
    name: 'Daniil Rychkov (flowfordan)',
    url: 'https://flowfordan.kitezh.xyz',
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
    'todo',
    'todo list',
    'todo list app',
    'todo list online',
    'todo list app',
    'todo list app online',
    'todo list app free',
    'todo list app free online',
    'todo list app free online',
    'todo list app free online',
    'flowfordan',
    'daniil rychkov',
    'flowfordan kitezh',
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
          content="An online Pomodoro Timer and Task Manager to help you focus and boost your productivity"
        />
        <meta
          property="og:image"
          content="https://focusify.kitezh.xyz/meta/main_og.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
        <link rel="manifest" href="/webmanifest.json"></link>
      </head>
      <body className={poppins.className}>
        <RootStoreProvider>
          <HeadProvider />
          <UIProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </UIProvider>
        </RootStoreProvider>
      </body>
    </html>
  );
}
