import { ThemeToggle } from 'shared/ui';
import styles from './header.module.scss';
import { useState } from 'react';
import { Theme } from 'shared/types';
import { useUIStore } from 'shared/providers';
import { SelectButton } from 'primereact/selectbutton';

interface HeaderProps {
  className?: string;
}

const options: Array<{ icon: string; value: Theme }> = [
  { icon: 'pi pi-sun', value: 'light_default' },
  { icon: 'pi pi-moon', value: 'dark_default' },
  { icon: 'pi pi-cloud', value: 'mystic_stillness' },
  { icon: 'pi pi-star', value: 'twilight' },
];

export const Header = ({}: HeaderProps) => {
  const [mounted, setMounted] = useState(false);
  const uiStore = useUIStore();
  const curTheme = uiStore.theme;
  const onThemeChange = (value: string) => {
    uiStore.setTheme(value as Theme);
  };
  return (
    <div className={styles.wrapper}>
      <div>Header widget</div>
      <ThemeToggle
        onChange={(v) => onThemeChange(v)}
        value={curTheme}
        options={options}
      />
    </div>
  );
};
