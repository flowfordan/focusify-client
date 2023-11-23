import { TimerStageId } from 'shared/config';
import styles from './CycleStatus.module.scss';
import cn from 'classnames';
import { Typography } from 'shared/ui';

interface CycleStatusProps {
  className?: string;
  scheme: Array<TimerStageId>;
  currentSchemeIdx: number;
}

const getTitle = (id: TimerStageId) => {
  switch (id) {
    case 'pomodoro':
      return 'Focus Time';
    case 'sBreak':
      return 'Short Break';
    case 'lBreak':
      return 'Long Break';
    default:
      return 'Focus Time';
  }
};

export const CycleStatus = ({
  className,
  currentSchemeIdx,
  scheme,
}: CycleStatusProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.bar}>
          {scheme.map((i, idx) => {
            return (
              <span
                className={cn(styles.itemWrap, {
                  [styles.sb]: i === 'sBreak',
                  [styles.lb]: i === 'lBreak',
                })}
                key={idx}
              >
                <span
                  className={cn(styles.arrow, {
                    [styles.active]: idx === currentSchemeIdx,
                  })}
                ></span>
              </span>
            );
          })}
        </div>
      </div>
      <Typography color="secondary" isCentered type="t3">
        {getTitle(scheme[currentSchemeIdx])}
      </Typography>
      {/* <div className={styles.txt}>{getTitle(scheme[currentSchemeIdx])}</div> */}
    </div>
  );
};
