import { observer } from 'mobx-react-lite';
import { timerModel } from '../../model/timerModel';
import styles from './Timer.module.scss';
import { Button } from 'primereact/button';
import cn from 'classnames';
import { CycleStatus } from './CycleStatus';
import { Knob } from 'primereact/knob';
import { useState } from 'react';

interface TimerProps {
  className?: string;
}

export const Timer = observer(({ className }: TimerProps) => {
  const timeLeft = timerModel.timeLeft;
  const isPlaying = timerModel.isPlaying;
  const cycle = timerModel.currentCycle;
  const timerPercent = timerModel.timerPercentLeft;
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
      <div>
        <div className={styles.knobWrap}>
          <Knob
            value={timerPercent}
            readOnly
            // valueColor="#708090"
            // rangeColor="#48d1cc"
            showValue={false}
            size={200}
          />
          <div className={styles.digits}>{timeLeft}</div>
        </div>
      </div>
      <CycleStatus scheme={cycle.scheme} currentSchemeIdx={cycle.currentIdx} />
      <div className={styles.controls}>
        <span className={styles.controlItem}>
          <Button
            icon="pi pi-stop"
            rounded
            aria-label="Play Timer"
            onClick={() => onStop()}
            title="Stop Timer"
            text
            raised
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
              title="Pause Timer"
            />
          ) : (
            <Button
              icon="pi pi-play"
              rounded
              aria-label="Play Timer"
              onClick={() => onTogglePlay()}
              title="Play Timer"
            />
          )}
        </span>
        <span className={styles.controlItem}>
          <Button
            icon="pi pi-step-forward"
            rounded
            aria-label="Next Timer Stage"
            onClick={() => onForward()}
            text
            raised
            severity="secondary"
          />
        </span>
      </div>
    </div>
  );
});
