'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
  getCurrentLoadedTheme,
  getDefaultTheme,
  LOGGER,
  setThemeLocally,
  usePrimeUI,
} from 'shared/lib';
import { useUIStore } from 'shared/providers';

/**
 * Component handling theme change
 * @param param0
 * @returns
 */
export const ThemeProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const [initThemeDef, setInitThemeDef] = useState(false);
    const uiStore = useUIStore();
    const curTheme = uiStore.theme;
    const primeContext = usePrimeUI();
    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      //if (!mounted) return;
      const theme = getDefaultTheme();
      LOGGER.debug('misc', `default theme: ${theme}`);
      uiStore.setTheme(theme);
      setInitThemeDef(true);
    }, [mounted]);

    useEffect(() => {
      if (!initThemeDef) return;
      const loadedTheme = getCurrentLoadedTheme('theme-link', curTheme);
      LOGGER.debug('misc', `, change to: ${curTheme}, prev: ${loadedTheme}`);
      const themeLink = document.getElementById('theme-link');
      if (themeLink && 'href' in themeLink) {
        themeLink.href = `/themes/${curTheme}.css`;
        //href="/themes/light_default.css"
        setThemeLocally(curTheme);
      }
      // primeContext.changeTheme &&
      //   primeContext?.changeTheme?.(
      //     `${loadedTheme}`,
      //     `${curTheme}`,
      //     'theme-link',
      //     () => {
      //       setThemeLocally(curTheme);
      //     }
      //   );
    }, [curTheme, initThemeDef]);
    return <>{children}</>;
  }
);
