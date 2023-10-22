import React from 'react';
import styles from './CardMain.module.scss';
import cn from 'classnames';

interface CardMainProps {
  className?: string;
  children: React.ReactNode;
  hatch?: 'lines' | 'dots';
  /** Box-shadow intensity */
  elevation?: boolean;
  border?: boolean;
  borderColorType?: 'default' | 'contrast';
  bgType?: 'default' | 'medium' | 'contrast';
}

export const CardMain = ({
  className,
  children,
  border,
  hatch,
  elevation,
  bgType = 'default',
}: CardMainProps) => {
  return (
    <div
      className={cn(className, styles.wrapper, {
        [styles.bordered]: border,
        [styles.hatchLine]: hatch === 'lines',
        [styles.hatchDots]: hatch === 'dots',
        [styles.elevated]: elevation,
        [styles.bgMedium]: bgType === 'medium',
        [styles.bgContrast]: bgType === 'contrast',
      })}
    >
      {children}
    </div>
  );
};
