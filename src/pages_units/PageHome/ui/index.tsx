'use client';
import { Tasks } from 'widgets/Tasks';
import { TasksCompact } from 'widgets/Tasks';
import { Sounds } from 'widgets/Sounds';
import styles from './pageHome.module.scss';
import { TimerCompact, TimerWidget } from 'widgets/Timer';
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
  useUIStore,
} from 'shared/providers';
import { LayoutModule } from 'shared';
import { ModuleId } from 'shared/config';

export const PageHome = observer(() => {
  const rootStore = useRootStore();
  const uiStore = useUIStore();
  const currentMobileModule = uiStore.modules.mobileViewCurrentModule;
  const tasksModule = useTasksStore();
  const soundsModule = useSoundsStore();
  const timerModule = useTimerStore();
  const isMobile = useIsMobile();
  const isSounds = soundsModule.isActive;
  const isTimer = timerModule.isActive;
  const isTasks = tasksModule.isActive;
  const enabledModulesCount = Object.entries(rootStore.modules).reduce(
    (acc, cur) => {
      const [id, module] = cur;
      if (module.isActive) return acc + 1;
      else return acc;
    },
    0
  );

  const onWidgetClose = (id: ModuleId) => {
    rootStore.modules[id].toggleModuleActive();
  };

  const onMobShow = (id?: ModuleId) => {
    uiStore.setMobileCurrentModule(id);
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.container}>
          {currentMobileModule && (
            <div className={styles.mobWrap}>
              <ModuleMob
                onHide={() => onMobShow()}
                module={currentMobileModule}
              />
            </div>
          )}

          <LayoutModule
            withExpand
            className={cn(styles.tasksWrap, {
              [styles.hidden]: !isTasks,
            })}
            onClose={() => onWidgetClose('tasks')}
            onExpand={() => onMobShow('tasks')}
            title="to-do"
          >
            <TasksCompact />
          </LayoutModule>
          <LayoutModule
            className={cn(styles.soundsWrap, {
              [styles.hidden]: !isSounds,
            })}
            onClose={() => onWidgetClose('sounds')}
            onExpand={() => onMobShow('sounds')}
            title="sounds"
          >
            Sounds
          </LayoutModule>
          <LayoutModule
            withExpand
            className={cn(styles.timerWrap, {
              [styles.hidden]: !isTimer,
            })}
            onClose={() => onWidgetClose('timer')}
            onExpand={() => onMobShow('timer')}
            title="pomodoro"
          >
            <TimerCompact />
          </LayoutModule>
          {enabledModulesCount === 0 && (
            <div className={styles.emptyWrap}>
              <svg>
                <use href={'/images/main_bg.svg#bg'} />
              </svg>
              {'↙ Turn on at least one widget to get started'}
            </div>
          )}
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
            <TimerWidget />
          </LayoutModule>
          {enabledModulesCount === 0 && (
            <div className={styles.emptyWrap}>
              <svg>
                <use href={'/images/main_bg.svg#bg'} />
              </svg>
              {'↙ Turn on at least one widget to get started'}
            </div>
          )}
        </div>
      )}
    </>
  );
});

interface IModuleMobProps {
  module: ModuleId;
  onHide: () => void;
}

const ModuleMob = ({ module, onHide }: IModuleMobProps) => {
  return (
    <LayoutModule
      isMob
      className={styles.layoutModuleWrap}
      onClose={() => {}}
      onHide={() => onHide()}
      title={
        module === 'timer'
          ? 'pomodoro'
          : module === 'tasks'
          ? 'to-do'
          : 'sounds'
      }
    >
      {module === 'tasks' ? (
        <Tasks />
      ) : module === 'timer' ? (
        <TimerWidget />
      ) : (
        <Sounds />
      )}
    </LayoutModule>
  );
};
