import styles from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header = ({}: HeaderProps) => {
  return <header>Header widget</header>;
};
