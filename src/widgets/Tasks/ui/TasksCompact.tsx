'use client';
import { expandTask, ToggleTask } from 'features/Task';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import cn from 'classnames';

interface ITasksWidgetProps {
  className?: string;
}

export const TasksCompact = observer(({ className }: ITasksWidgetProps) => {
  // const tasks = taskModel.tasks;
  return (
    <div className={cn(className, styles.wrapper)}>
      <div>X done Y to go</div>
      <div>Focused task</div>
      <div>Show btn</div>
    </div>
  );
});
