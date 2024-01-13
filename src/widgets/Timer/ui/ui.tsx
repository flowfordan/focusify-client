import { Card } from 'primereact/card';
import styles from './ui.module.scss';
import cn from 'classnames';
import { CardMain } from 'shared/ui';
import { useTimerStore, useUIStore } from 'shared';
import { Timer, TimerConfig } from 'entities/Timer';
import { Button } from 'primereact/button';
import { ModalMenu } from 'shared/templates';
import { observer } from 'mobx-react-lite';
interface ITimerWidgetProps {
  className?: string;
}

export const TimerWidget = observer(({ className }: ITimerWidgetProps) => {
  const timerStore = useTimerStore();
  const uiStore = useUIStore();
  const isConfigMenuOpen = uiStore.isModuleConfigMenuOpen('timer');
  const onOptionsMenuToggle = (open: boolean) => {
    uiStore.setModuleConfigMenuOpen('timer', open);
  };
  return (
    <div className={styles.content}>
      <div>
        <Button
          title="Pomodoro Options"
          icon="pi pi-cog"
          text
          severity="secondary"
          aria-label="Pomodoro Options"
          size="small"
          onClick={() => onOptionsMenuToggle(true)}
        />
      </div>
      <div className={styles.main}>
        <Timer />
      </div>
      <ModalMenu
        visible={isConfigMenuOpen}
        onClose={() => onOptionsMenuToggle(false)}
      >
        <TimerConfig onClose={() => onOptionsMenuToggle(false)} />
      </ModalMenu>
    </div>
  );
});
