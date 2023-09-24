'use client';
import { TaskItem, TaskItemExt } from 'entities/Task';
import { ToggleTask } from 'features/Task';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import cn from 'classnames';
import { useTasksModel } from 'shared/providers';

interface ITasksWidgetProps {
  className?: string;
}

export const Tasks = observer(({ className }: ITasksWidgetProps) => {
  const tasksModel = useTasksModel();
  const tasks = tasksModel.tasks;
  return (
    <div className={cn(className, styles.wrapper)}>
      <div>Tasks List</div>
      <div>Close widget</div>
      <div>Widget header</div>
      <div>
        {tasks.map((item) => (
          <TaskItem
            isExpanded={item.isExpanded}
            taskData={item}
            key={item.id}
            toggle={<ToggleTask taskId={item.id} />}
          />
        ))}
      </div>
      <div>New</div>
    </div>
  );
});
