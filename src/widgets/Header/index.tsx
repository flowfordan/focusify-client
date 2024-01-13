import { ThemeToggle } from 'shared/ui';
import styles from './header.module.scss';
import { useState } from 'react';
import { Theme } from 'shared/types';
import { useUIStore } from 'shared/providers';
import { SelectButton } from 'primereact/selectbutton';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { Button } from 'primereact/button';

interface HeaderProps {
  className?: string;
}

const options: Array<{ icon: string; value: Theme }> = [
  { icon: 'pi pi-sun', value: 'light_default' },
  { icon: 'pi pi-moon', value: 'dark_default' },
  { icon: 'pi pi-cloud', value: 'mystic_stillness' },
  { icon: 'pi pi-star', value: 'twilight' },
];

export const Header = observer(({}: HeaderProps) => {
  const [mounted, setMounted] = useState(false);
  const uiStore = useUIStore();
  const curTheme = uiStore.theme;
  const onThemeChange = (value: string) => {
    uiStore.setTheme(value as Theme);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Link href={'/'}>
          <div className={styles.logo}>
            <svg>
              <title>FOCUSIFY logo</title>
              <use href={'/icons/logo_full.svg#logo'} />
            </svg>
          </div>
        </Link>
      </div>
      <div className={styles.add}>
        <span className={styles.link}>
          <Link href={'/about'}>
            <Button
              icon="pi pi-question-circle"
              aria-label="About"
              // onClick={() => onStop()}
              text
              severity="secondary"
              size="small"
            />
          </Link>
        </span>

        <ThemeToggle
          onChange={(v) => onThemeChange(v)}
          value={options.find((o) => o.value === curTheme) || options[0]}
          options={options}
        />
      </div>
    </div>
  );
});
