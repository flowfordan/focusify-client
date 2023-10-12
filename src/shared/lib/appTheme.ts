import { Theme, themes } from 'shared/types';
import { STORAGE } from './storage';

export const getDefaultTheme = () => {
  //1 - check local storage
  const savedTheme = STORAGE.get('theme');
  if (themes.some((theme) => theme === savedTheme)) return savedTheme as Theme;
  //2 - check browser theme
  const browserTheme =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  return browserTheme as Theme;
};

export const getCurrentLoadedTheme = (id: string, fallback: Theme) => {
  if (typeof window === 'undefined') return fallback;
  const link = document.getElementById(id);
  if (!link) return fallback;
  const href = link.getAttribute('href');
  if (!href) return fallback;
  //ok when there are 2 themes available
  if (href.includes('light')) return 'light' as Theme;
  else return 'dark' as Theme;
};

export const setThemeLocally = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  STORAGE.set('theme', theme);
};
