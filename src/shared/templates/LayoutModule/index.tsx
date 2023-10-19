import { CardMain } from 'shared/ui';
import styles from './layoutModule.module.scss';
import cn from 'classnames';
import { Button } from 'primereact/button';

interface LayoutModuleProps {
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
  title: string;
}

export const LayoutModule = ({
  className,
  children,
  onClose,
  title,
}: LayoutModuleProps) => {
  return (
    <CardMain bgType="default" border className={cn(className, styles.wrapper)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.close}>
        <Button
          icon="pi pi-times"
          rounded
          text
          severity="secondary"
          aria-label="Filter"
          size="small"
          onClick={onClose}
        />
      </div>
      {children}
    </CardMain>
  );
};

export default LayoutModule;
