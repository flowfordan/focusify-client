import cn from 'classnames';

import styles from './Typography.module.scss';

interface TypographyProps {
  className?: string;
  type?: 't1' | 't2' | 't3' | 't4' | 'r1' | 'r2' | 'd1' | 'd2';
  Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  color?: 'default' | 'secondary';
  isCentered?: boolean;
  children: React.ReactNode;
}

export const Typography = ({
  type = 'r1',
  className,
  Tag = 'span',
  children,
  color = 'default',
  isCentered,
}: TypographyProps) => {
  return (
    <Tag
      className={cn(className, styles.wrapper, styles[type], {
        [styles.centered]: isCentered,
        [styles.secondary]: color === 'secondary',
      })}
    >
      {children}
    </Tag>
  );
};
