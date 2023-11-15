'use client';
import { Tasks } from 'widgets/Tasks';
import { TasksCompact } from 'widgets/Tasks';
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
import { LayoutModule } from 'shared';
import { ModuleId } from 'shared/config';

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

  const onWidgetClose = (id: ModuleId) => {
    rootStore.modules[id].toggleModuleActive();
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.container}>
          <LayoutModule
            withExpand
            className={cn(styles.tasksWrap, {
              [styles.hidden]: !isTasks,
            })}
            onClose={() => onWidgetClose('tasks')}
            title="to-do"
          >
            <TasksCompact />
          </LayoutModule>
          <LayoutModule
            className={cn(styles.soundsWrap, {
              [styles.hidden]: !isSounds,
            })}
            onClose={() => onWidgetClose('sounds')}
            title="sounds"
          >
            Sounds
          </LayoutModule>
          <LayoutModule
            className={cn(styles.timerWrap, {
              [styles.hidden]: !isTimer,
            })}
            onClose={() => onWidgetClose('timer')}
            title="pomodoro"
          >
            Timer
          </LayoutModule>
        </div>
      ) : (
        <div
          className={cn(styles.container, {
            [styles.timer_tasks]: !isSounds && isTimer && isTasks,
            [styles.timer_sounds]: isSounds && isTimer && !isTasks,
            [styles.tasks_sounds]: isSounds && !isTimer && isTasks,
            [styles.one]: enabledModulesCount === 1,
            [styles.empty]: !isSounds && !isTasks && !isTimer,
          })}
        >
          <LayoutModule
            className={cn(styles.soundsWrap, {
              [styles.hidden]: !isSounds,
              [styles.one]: !isTimer && !isTasks && isSounds,
            })}
            onClose={() => onWidgetClose('sounds')}
            title={'sounds'}
          >
            <Sounds />
          </LayoutModule>

          <LayoutModule
            className={cn(styles.tasksWrap, {
              [styles.hidden]: !isTasks,
              [styles.one]: !isSounds && !isTimer && isTasks,
            })}
            onClose={() => onWidgetClose('tasks')}
            title={'to-do'}
          >
            <Tasks />
          </LayoutModule>

          <LayoutModule
            className={cn(styles.timerWrap, {
              [styles.hidden]: !isTimer,
              [styles.one]: !isSounds && !isTasks && isTimer,
            })}
            onClose={() => onWidgetClose('timer')}
            title={'pomodoro'}
          >
            <Timer />
          </LayoutModule>
        </div>
      )}
    </>
  );
});
