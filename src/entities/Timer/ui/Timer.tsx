import { observer } from 'mobx-react-lite';
import { timerModel } from '../model/timerModel';
import styles from './Timer.module.scss';
import { Button } from 'primereact/button';
import cn from 'classnames';
import { CycleStatus } from './CycleStatus';

interface TimerProps {
  className?: string;
}

const scheme = ['a', 'b', 'a', 'b', 'c'];

export const Timer = observer(({}: TimerProps) => {
  const timeLeft = timerModel.timeLeft;
  const isPlaying = timerModel.isPlaying;
  const onTogglePlay = () => {
    timerModel.togglePlay();
  };
  return (
    <div>
      <div>{timeLeft}</div>
      <CycleStatus />
      {/* <div className={styles.statusWrap}>
        <div className={styles.statusBar}>
          {scheme.map((i, idx) => {
            return (
              <span
                className={cn(styles.item, {
                  [styles.sb]: i === 'b',
                  [styles.lb]: i === 'c',
                })}
                key={idx}
              ></span>
            );
          })}
        </div>
        <div>Focus Time!</div>
      </div> */}
      <div className={styles.controls}>
        <span className={styles.controlItem}>
          <Button
            icon="pi pi-stop"
            rounded
            aria-label="Play Timer"
            onClick={() => {}}
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
            onClick={() => {}}
            tooltip="Next Timer Stage"
            outlined
            severity="secondary"
          />
        </span>
      </div>
    </div>
  );
});
