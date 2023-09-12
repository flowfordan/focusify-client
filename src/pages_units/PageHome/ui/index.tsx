'use client';
import { Tasks } from 'widgets/Tasks';
import { Sounds } from 'widgets/Sounds';
import styles from './pageHome.module.scss';
import { Timer } from 'widgets/Timer';
import { useEffect, useState } from 'react';
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
    isActive: false,
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
  const [mobCurrentIdx, setMobCurrentIdx] = useState(0);
  const [curScreens, setCurScreens] = useState<Array<IScreen>>(screens);

  const toggleWidgetEnable = (screen: ScreenName) => {
    setCurScreens((prev) => {
      const updatedScreens = [...prev];
      const idx = updatedScreens.findIndex((s) => s.name === screen);
      updatedScreens[idx].isEnabled = !updatedScreens[idx].isEnabled;
      return updatedScreens;
    });
  };

  useEffect(() => {
    //upd concrete lables
    for (let i = 0; i < curScreens.length; i++) {
      if (curScreens[i].name === 'sounds') {
        setIsSounds(curScreens[i].isEnabled);
      }
      if (curScreens[i].name === 'tasks') {
        setIsTasks(curScreens[i].isEnabled);
      }
      if (curScreens[i].name === 'timer') {
        setIsTimer(curScreens[i].isEnabled);
      }
    }
  }, [curScreens]);

  useEffect(() => {
    console.log('change current idx');
    for (let i = 0; i < screens.length; i++) {
      //find next enabled screen
      if (screens[i].isEnabled) {
        setCurScreens((prev) => {
          const updatedScreens = [...prev];
          updatedScreens[i].isActive = i === mobCurrentIdx ? true : false;
          return updatedScreens;
        });
      }
    }
  }, [mobCurrentIdx]);

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
            onChange={() => toggleWidgetEnable('sounds')}
          />
          Sounds
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTasks}
            onChange={() => toggleWidgetEnable('tasks')}
          />
          Tasks
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTimer}
            onChange={() => toggleWidgetEnable('timer')}
          />
          Timer
        </label>
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
