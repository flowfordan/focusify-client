import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { useTimerStore } from 'shared';
import styles from './timerCompact.module.scss';
interface ITimerWidgetProps {
  className?: string;
}

export const TimerCompact = observer(({ className }: ITimerWidgetProps) => {
  const timerStore = useTimerStore();
  const timeLeft = timerStore.timeLeftFormatted;
  const stage = timerStore.timer.stage.id;
  const status = timerStore.timer.stage.status;
  return (
    <div className={cn(className, styles.wrapper)}>
      <div
        className={cn(styles.clock, {
          [styles.active]: status === 'active',
        })}
      >
        {timeLeft}
      </div>
      <div className={styles.subtitle}>
        {stage === 'pomodoro'
          ? 'Focus Time!'
          : stage === 'sBreak'
          ? 'Time to take a break'
          : 'Time to have a proper break'}
      </div>
    </div>
  );
});
