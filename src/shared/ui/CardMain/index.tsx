import React from 'react';
import styles from './CardMain.module.scss';
import cn from 'classnames';

interface CardMainProps {
  className?: string;
  children: React.ReactNode;
  hatch?: 'lines' | 'dots';
  /** Box-shadow intensity */
  elevation?: 'low' | 'medium' | 'high';
}

export const CardMain = ({ children }: CardMainProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};
