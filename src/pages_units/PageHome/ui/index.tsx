'use client';
import { Tasks } from 'widgets/Tasks';
import { Sounds } from 'widgets/Sounds';
import styles from './pageHome.module.scss';
import { Timer } from 'widgets/Timer';
import cn from 'classnames';
import { homeModel } from '../model/homeModel';
import { observer } from 'mobx-react-lite';
import { ModuleName } from '../config';

export const PageHome = observer(() => {
  const isSounds = homeModel.isModuleEnabled('sounds');
  const isTimer = homeModel.isModuleEnabled('timer');
  const isTasks = homeModel.isModuleEnabled('tasks');
  const modules = homeModel.modules;
  const enabledModulesCount = homeModel.enabledModulesCount;

  const toggleWidgetEnable = (screen: ModuleName) => {
    homeModel.toggleWidgetEnabled(screen);
  };

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
