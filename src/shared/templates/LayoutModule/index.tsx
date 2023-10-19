import { CardMain } from 'shared/ui';
import styles from './layoutModule.module.scss';
import cn from 'classnames';
import { Button } from 'primereact/button';

interface LayoutModuleProps {
  className?: string;
  children?: React.ReactNode;
  onClose: (id: string) => void;
  moduleId: string;
}

export const LayoutModule = ({
  className,
  children,
  onClose,
  moduleId,
}: LayoutModuleProps) => {
  return (
    <CardMain bgType="default" border className={cn(className, styles.wrapper)}>
      <div className={styles.close}>
        <Button
          icon="pi pi-times"
          rounded
          text
          severity="secondary"
          aria-label="Filter"
          size="small"
          onClick={() => onClose(moduleId)}
        />
      </div>
      {children}
    </CardMain>
  );
};

export default LayoutModule;
