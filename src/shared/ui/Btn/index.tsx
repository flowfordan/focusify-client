import styles from './Btn.module.scss';

interface BtnProps {
  className?: boolean;
  iconPrime: string;
}

export const Btn = ({ className, iconPrime }: BtnProps) => {
  return (
    <button className={styles.btn}>
      <i className={`pi ${iconPrime}`}></i>
    </button>
  );
};
