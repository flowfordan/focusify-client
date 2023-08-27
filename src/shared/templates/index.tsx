import { ReactNode } from "react";
import styles from './layoutMain.module.scss';

interface LayoutMainProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

//get header, footer and content
export const LayoutMain = ({header, footer, children}: LayoutMainProps) => {
  return (<div className={styles.layout}>
    {header && <header className={styles.header}>{header}</header>}
    <main className={styles.main}>{children}</main>
    {footer && <footer className={styles.footer}>{footer}</footer>}
  </div>);
}
