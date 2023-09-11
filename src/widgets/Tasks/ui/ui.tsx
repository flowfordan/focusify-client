'use client';
import { taskModel, TaskItem, TaskItemExt } from 'entities/Task';
import { expandTask, ToggleTask } from 'features/Task';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import cn from 'classnames';

interface ITasksWidgetProps {
  className?: string;
}

export const Tasks = observer(({ className }: ITasksWidgetProps) => {
  const tasks = taskModel.tasks;
  return (
    <div className={cn(className, styles.wrapper)}>
      <div>Tasks List</div>
      <div>
        {tasks.map((item) => {
          if (item.isExpanded)
            return (
              <TaskItem
                isExpanded
                taskData={item}
                key={item.id}
                toggle={<ToggleTask taskId={item.id} />}
              />
            );
          return (
            <TaskItem
              taskData={item}
              key={item.id}
              toggle={<ToggleTask taskId={item.id} />}
            />
          );
        })}
      </div>
    </div>
  );
});
