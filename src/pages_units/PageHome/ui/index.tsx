'use client';
import { Tasks } from 'widgets/Tasks';
import { Sounds } from 'widgets/Sounds';
import styles from './pageHome.module.scss';
import { Timer } from 'widgets/Timer';
import { useState } from 'react';
import cn from 'classnames';

type ScreenName = 'sounds' | 'tasks' | 'timer';
interface IScreen {
  name: ScreenName;
  isActive: boolean;
  isEnabled: boolean;
}

const screens: Array<IScreen> = [
  {
    name: 'timer',
    isActive: true,
    isEnabled: true,
  },
  {
    name: 'tasks',
    isActive: false,
    isEnabled: true,
  },
  {
    name: 'sounds',
    isActive: false,
    isEnabled: true,
  },
];

export const PageHome = () => {
  const [isSounds, setIsSounds] = useState(true);
  const [isTimer, setIsTimer] = useState(true);
  const [isTasks, setIsTasks] = useState(true);
  const [curScreens, setCurScreens] = useState<Array<IScreen>>(screens);
  const handleScreenSwap = (isNext?: boolean) => {
    //find active screen
    const activeIdx = screens.findIndex((s) => s.isActive);
    //if non - do nothing
    if (activeIdx < 0) return;
    if (isNext) {
      if (activeIdx === screens.length - 1) return;
      for (let i = activeIdx + 1; i < screens.length; i++) {
        //find next enabled screen
        if (screens[i].isEnabled) {
          setCurScreens((prev) => {
            const updatedScreens = [...prev];
            updatedScreens[activeIdx].isActive = false;
            updatedScreens[i].isActive = true;
            return updatedScreens;
          });
          break;
        }
      }
    } else {
      if (activeIdx === 0) return;
      for (let i = activeIdx - 1; i > -1; i--) {
        //find next enabled screen
        if (screens[i].isEnabled) {
          setCurScreens((prev) => {
            const updatedScreens = [...prev];
            updatedScreens[activeIdx].isActive = false;
            updatedScreens[i].isActive = true;
            return updatedScreens;
          });
          break;
        }
      }
    }
  };
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
        <div>
          <button onClick={() => handleScreenSwap()}>{'<'}</button>
          <button onClick={() => handleScreenSwap(true)}>{'>'}</button>
        </div>
      </div>
      <Sounds
        className={cn(styles.soundsWrap, {
          [styles.hidden]: !isSounds,
          [styles.mobHidden]:
            curScreens.find((s) => s.isActive)?.name !== 'sounds',
        })}
      />
      <Tasks
        className={cn(styles.tasksWrap, {
          [styles.hidden]: !isTasks,
          [styles.mobHidden]:
            curScreens.find((s) => s.isActive)?.name !== 'tasks',
        })}
      />
      <Timer
        className={cn(styles.timerWrap, {
          [styles.hidden]: !isTimer,
          [styles.mobHidden]:
            curScreens.find((s) => s.isActive)?.name !== 'timer',
        })}
      />
    </div>
  );
};
