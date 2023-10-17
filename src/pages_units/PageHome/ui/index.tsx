'use client';
import { Tasks } from 'widgets/Tasks';
import { Sounds } from 'widgets/Sounds';
import styles from './pageHome.module.scss';
import { Timer } from 'widgets/Timer';
import cn from 'classnames';
import { homeModel } from '../model/homeModel';
import { observer } from 'mobx-react-lite';
import { ModuleName } from '../config';
import { useCallback, useEffect, useState } from 'react';
import { useIsMobile } from 'shared/lib';
import {
  useRootStore,
  useSoundsStore,
  useTasksStore,
  useTimerStore,
} from 'shared/providers';

export const PageHome = observer(() => {
  const rootStore = useRootStore();
  const tasksModule = useTasksStore();
  const soundsModule = useSoundsStore();
  const timerModule = useTimerStore();
  const isMobile = useIsMobile();
  const isSounds = soundsModule.isActive;
  const isTimer = timerModule.isActive;
  const isTasks = tasksModule.isActive;
  const enabledModulesCount = rootStore.modulesStats.activeCount;

  return (
    <div
      className={cn(styles.container, {
        [styles.timer_tasks]: !isSounds && isTimer && isTasks,
        [styles.timer_sounds]: isSounds && isTimer && !isTasks,
        [styles.tasks_sounds]: isSounds && !isTimer && isTasks,
        [styles.one]: enabledModulesCount === 1,
        [styles.empty]: !isSounds && !isTasks && !isTimer,
      })}
    >
      <Sounds
        className={cn(styles.soundsWrap, {
          [styles.hidden]: !isSounds,
          [styles.one]: !isTimer && !isTasks && isSounds,
        })}
      />

      <Tasks
        className={cn(styles.tasksWrap, {
          [styles.hidden]: !isTasks,
          [styles.one]: !isSounds && !isTimer && isTasks,
        })}
      />

      <Timer
        className={cn(styles.timerWrap, {
          [styles.hidden]: !isTimer,
          [styles.one]: !isSounds && !isTasks && isTimer,
        })}
      />
    </div>
  );
});
