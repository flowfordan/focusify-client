import { observer } from 'mobx-react-lite';
import styles from './AppVersionBadge.module.scss';
import { useRootStore } from 'shared';

interface AppVerBadgeProps {
  className?: string;
}

export const AppVerBadge = observer(({ className }: AppVerBadgeProps) => {
  const store = useRootStore();
  return <div className={styles.wrapper}>{`FOCUSIFY v.${store.appVer}`}</div>;
});
