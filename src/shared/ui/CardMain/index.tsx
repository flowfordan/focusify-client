import React from 'react';
import styles from './CardMain.module.scss';
import cn from 'classnames';

interface CardMainProps {
  className?: string;
  children: React.ReactNode;
  hatch?: 'lines' | 'dots';
  /** Box-shadow intensity */
  elevation?: 'low' | 'medium' | 'high';
  border?: boolean;
}

export const CardMain = ({ children, border, hatch }: CardMainProps) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.bordered]: border,
        [styles.hatchLine]: hatch === 'lines',
        [styles.hatchDots]: hatch === 'dots',
      })}
    >
      {children}
    </div>
  );
};
