import styles from './CycleStatus.module.scss';
import cn from 'classnames';

interface CycleStatusProps {
  className?: string;
}

const scheme = ['a', 'b', 'a', 'c'];
const curIdx = 1;

export const CycleStatus = ({ className }: CycleStatusProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.bar}>
          {scheme.map((i, idx) => {
            return (
              <span
                className={cn(styles.itemWrap, {
                  [styles.sb]: i === 'b',
                  [styles.lb]: i === 'c',
                })}
                key={idx}
              >
                <span
                  className={cn(styles.arrow, {
                    [styles.active]: idx === curIdx,
                  })}
                ></span>
              </span>
            );
          })}
        </div>
      </div>
      <div className={styles.txt}>Focus Time</div>
    </div>
  );
};
