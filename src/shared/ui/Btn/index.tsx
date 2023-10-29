import styles from './Btn.module.scss';
import { BtnProps } from './Btn.props';

export const Btn = ({ className, iconPrime, ...props }: BtnProps) => {
  return (
    <button className={styles.btn} {...props}>
      <i className={`pi ${iconPrime}`}></i>
    </button>
  );
};
