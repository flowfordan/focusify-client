import { observer } from 'mobx-react-lite';
import { timerModel } from '../model/timerModel';
import styles from './Timer.module.scss';
import { Button } from 'primereact/button';
import cn from 'classnames';
import { CycleStatus } from './CycleStatus';

interface TimerProps {
  className?: string;
}

export const Timer = observer(({}: TimerProps) => {
  const timeLeft = timerModel.timeLeft;
  const isPlaying = timerModel.isPlaying;
  const cycle = timerModel.currentCycle;
  const onTogglePlay = () => {
    timerModel.togglePlay();
  };
  const onForward = () => {
    timerModel.forward();
  };
  const onStop = () => {
    timerModel.stop();
  };
  return (
    <div>
      <div>{timeLeft}</div>
      <CycleStatus scheme={cycle.scheme} currentSchemeIdx={cycle.currentIdx} />
      <div className={styles.controls}>
        <span className={styles.controlItem}>
          <Button
            icon="pi pi-stop"
            rounded
            aria-label="Play Timer"
            onClick={() => onStop()}
            tooltip="Stop Timer"
            outlined
            severity="secondary"
          />
        </span>
        <span className={styles.controlItem}>
          {isPlaying ? (
            <Button
              icon="pi pi-pause"
              //pi-pause
              rounded
              aria-label="Pause Timer"
              onClick={() => onTogglePlay()}
              tooltip="Pause Timer"
            />
          ) : (
            <Button
              icon="pi pi-play"
              rounded
              aria-label="Play Timer"
              onClick={() => onTogglePlay()}
              tooltip="Play Timer"
            />
          )}
        </span>
        <span className={styles.controlItem}>
          <Button
            icon="pi pi-step-forward"
            rounded
            aria-label="Next Timer Stage"
            onClick={() => onForward()}
            tooltip="Next Timer Stage"
            outlined
            severity="secondary"
          />
        </span>
      </div>
    </div>
  );
});
