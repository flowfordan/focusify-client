import { createPortal } from 'react-dom';
import styles from './ModalMenu.module.scss';
import cn from 'classnames';
import { CardMain, OutsideClickHandler } from 'shared/ui';
import { Button } from 'primereact/button';

interface ModalMenuProps {
  className?: string;
  children: React.ReactNode;
  visible?: boolean;
  onClose: () => void;
}

export const ModalMenu = ({ children, visible, onClose }: ModalMenuProps) => {
  return (
    <>
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={cn(styles.wrapper, {
              [styles.visible]: visible,
            })}
          >
            <OutsideClickHandler onOutsideClick={onClose}>
              <CardMain
                elevation
                className={cn(styles.container, {
                  [styles.visible]: visible,
                })}
              >
                <div className={styles.close}>
                  <Button
                    title="Close menu"
                    icon="pi pi-times"
                    text
                    rounded
                    severity="secondary"
                    aria-label="Close menu"
                    size="small"
                    onClick={onClose}
                  />
                </div>
                {children}
              </CardMain>
            </OutsideClickHandler>
          </div>,
          document.body
        )}
    </>
  );
};
