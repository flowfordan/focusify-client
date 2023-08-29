'use client';
import { Tasks } from 'widgets/Tasks';
import { Sounds } from 'widgets/Sounds';
import styles from './pageHome.module.scss';
import { Timer } from 'widgets/Timer';
import { useState } from 'react';
import cn from 'classnames';

export const PageHome = () => {
  const [isSounds, setIsSounds] = useState(false);
  return (
    <div
      className={cn(styles.container, {
        [styles.soundless]: !isSounds,
      })}
    >
      <div className={styles.tempBtn}>
        <button onClick={() => setIsSounds(!isSounds)}>Sounds toggle</button>
      </div>
      <Sounds
        className={cn(styles.soundsWrap, {
          [styles.hidden]: !isSounds,
        })}
      />
      <Tasks className={styles.tasksWrap} />
      <Timer className={styles.timerWrap} />
    </div>
  );
};
