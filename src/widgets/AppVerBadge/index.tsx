import styles from './AppVersionBadge.module.scss';

interface AppVerBadgeProps {
  className?: string;
}

export const AppVerBadge = ({ className }: AppVerBadgeProps) => {
  return (
    <div
      className={styles.wrapper}
    >{`FOCUSIFY ver.${process.env.NEXT_PUBLIC_APP_VERSION}`}</div>
  );
};
