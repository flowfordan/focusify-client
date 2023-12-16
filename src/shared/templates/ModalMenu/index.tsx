import { createPortal } from 'react-dom';
import styles from './ModalMenu.module.scss';
import cn from 'classnames';
import { CardMain, OutsideClickHandler } from 'shared/ui';

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
                {children}
              </CardMain>
            </OutsideClickHandler>
          </div>,
          document.body
        )}
    </>
  );
};
