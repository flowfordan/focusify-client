'use client';
import { expandTask, ToggleTask } from 'features/Task';
import { observer } from 'mobx-react-lite';
import styles from './tasksCompact.module.scss';
import cn from 'classnames';
import { useTasksStore } from 'shared';
import { Typography } from 'shared/ui';

interface ITasksWidgetProps {
  className?: string;
}

export const TasksCompact = observer(({ className }: ITasksWidgetProps) => {
  const tasksStore = useTasksStore();
  const tasksCount = tasksStore.tasksCount;
  const tasksDoneCount = tasksStore.tasksDoneCount;
  const tasksRemains = tasksCount - tasksDoneCount;
  const currentFocused = tasksStore.currentFocusedTask;
  // const tasks = taskModel.tasks;
  return (
    <div className={cn(className, styles.wrapper)}>
      {tasksCount === 0 && (
        <span className={styles.empty}>Tasks list is empty</span>
      )}
      {tasksCount > 0 && (
        <div className={styles.tasksStat}>
          <div>
            <Typography type="t2" color="secondary">
              {tasksDoneCount}
            </Typography>
            {' done, '}
            <Typography type="t2" color="secondary">
              {tasksRemains}
            </Typography>
            {' to go'}
          </div>
        </div>
      )}
      {currentFocused && (
        <div className={styles.focusedTask}>
          <Typography type="d1" color="secondary">
            current task:
          </Typography>
          <Typography type="t2" className={styles.taskTitle}>
            {currentFocused.title}
          </Typography>
        </div>
      )}
    </div>
  );
});
