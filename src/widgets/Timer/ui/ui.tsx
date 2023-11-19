import { Card } from 'primereact/card';
import styles from './ui.module.scss';
import cn from 'classnames';
import { CardMain } from 'shared/ui';
import { useTimerStore } from 'shared';
import { Timer } from 'entities/Timer';
interface ITimerWidgetProps {
  className?: string;
}

export const TimerWidget = ({ className }: ITimerWidgetProps) => {
  const timerStore = useTimerStore();
  return (
    <div className={styles.content}>
      <div>Controls</div>
      <div className={styles.main}>
        <Timer />
      </div>
    </div>
  );
};
