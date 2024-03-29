import { CardMain } from 'shared/ui';
import styles from './layoutModule.module.scss';
import cn from 'classnames';
import { Button } from 'primereact/button';

interface LayoutModuleProps {
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onExpand?: () => void;
  onHide?: () => void;
  title: string;
  withExpand?: boolean;
  isMob?: boolean;
}

export const LayoutModule = ({
  className,
  children,
  onClose,
  onExpand,
  onHide,
  title,
  isMob,
  withExpand,
}: LayoutModuleProps) => {
  return (
    <CardMain bgType="default" border className={cn(className, styles.wrapper)}>
      <div className={styles.title}>
        {isMob && (
          <Button
            icon="pi pi-chevron-left"
            rounded
            text
            severity="secondary"
            aria-label="Hide module"
            size="small"
            onClick={onHide}
          />
        )}
        {title}
      </div>
      {!isMob && (
        <div className={styles.close}>
          <Button
            icon="pi pi-times"
            rounded
            text
            severity="secondary"
            aria-label="Close module"
            size="small"
            onClick={onClose}
          />
        </div>
      )}
      {withExpand && (
        <div className={styles.expand}>
          <Button
            icon="pi pi-window-maximize"
            rounded
            // outlined
            // severity="secondary"
            aria-label="Expand"
            size="small"
            onClick={onExpand}
          />
        </div>
      )}
      {children}
    </CardMain>
  );
};

export default LayoutModule;
