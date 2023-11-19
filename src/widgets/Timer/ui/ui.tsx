import { Card } from 'primereact/card';
import styles from './ui.module.scss';
import cn from 'classnames';
import { CardMain } from 'shared/ui';
interface ITimerWidgetProps {
  className?: string;
}

export const Timer = ({ className }: ITimerWidgetProps) => {
  //
  return (
    <div className={styles.content}>
      <div className={styles.manage}>
        <button>Options</button>
      </div>
      <div className={styles.main}>Timer</div>
    </div>
  );
};
