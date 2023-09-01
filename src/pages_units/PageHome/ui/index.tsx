'use client';
import { Tasks } from 'widgets/Tasks';
import { Sounds } from 'widgets/Sounds';
import styles from './pageHome.module.scss';
import { Timer } from 'widgets/Timer';
import { useState } from 'react';
import cn from 'classnames';

export const PageHome = () => {
  const [isSounds, setIsSounds] = useState(true);
  const [isTimer, setIsTimer] = useState(true);
  const [isTasks, setIsTasks] = useState(true);
  return (
    <div
      className={cn(styles.container, {
        [styles.timer_tasks]: !isSounds && isTimer && isTasks,
        [styles.timer_sounds]: isSounds && isTimer && !isTasks,
        [styles.tasks_sounds]: isSounds && !isTimer && isTasks,
        [styles.one__tasks]: isTasks && !isTimer && !isSounds,
        [styles.one__sounds]: isSounds && !isTimer && !isTasks,
        [styles.one__timer]: isTimer && !isSounds && !isTasks,
        [styles.empty]: !isSounds && !isTasks && !isTimer,
      })}
    >
      <div className={styles.tempBtn}>
        <label>
          <input
            type="checkbox"
            checked={isSounds}
            onChange={() => setIsSounds(!isSounds)}
          />
          Sounds
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTasks}
            onChange={() => setIsTasks(!isTasks)}
          />
          Tasks
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTimer}
            onChange={() => setIsTimer(!isTimer)}
          />
          Timer
        </label>
        {/* <button onClick={() => setIsSounds(!isSounds)}>Sounds toggle</button>
        <button onClick={() => setIsTasks(!isTasks)}>Tasks toggle</button>
        <button onClick={() => setIsTimer(!isTimer)}>Timer toggle</button> */}
      </div>
      <Sounds
        className={cn(styles.soundsWrap, {
          [styles.hidden]: !isSounds,
        })}
      />
      <Tasks
        className={cn(styles.tasksWrap, {
          [styles.hidden]: !isTasks,
        })}
      />
      <Timer
        className={cn(styles.timerWrap, {
          [styles.hidden]: !isTimer,
        })}
      />
    </div>
  );
};
