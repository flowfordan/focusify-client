'use client';
import { TaskItem, TaskItemExt } from 'entities/Task';
import { ToggleTask } from 'features/Task';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import cn from 'classnames';
import { useTasksStore } from 'shared/providers';
import { useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { CardMain } from 'shared/ui';

interface ITasksWidgetProps {
  className?: string;
}

export const Tasks = observer(({ className }: ITasksWidgetProps) => {
  const tasksModel = useTasksStore();
  // const tasks = tasksModel.tasks;
  // const taskInCreation = tasksModel.taskInCreation;
  //scroll to new element
  const createdTaskRef = useRef<HTMLDivElement>(null);

  const onNewTask = () => {
    // tasksModel.createTask();
  };

  // useEffect(() => {
  //   console.log('new task', createdTaskRef.current);
  //   if (createdTaskRef.current) {
  //     createdTaskRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [taskInCreation]);

  return (
    <CardMain
      bgType="default"
      border
      elevation
      className={cn(className, styles.wrapper)}
    >
      {/* <CardHeader>
        <Heading size={'md'}>Tasks List</Heading>
      </CardHeader> */}
      <div>Close widget</div>

      <div className={styles.list}>
        <CardMain border hatch={'lines'}>
          {'TaskItem'}
        </CardMain>
        <CardMain border hatch={'dots'}>
          {'TaskItem 2'}
        </CardMain>
        <CardMain border>{'TaskItem 2'}</CardMain>
        <CardMain border elevation>
          {'TaskItem 2'}
        </CardMain>
        {/* {tasks.map((item) => (
          <TaskItem
            isExpanded={item.isExpanded}
            taskData={item}
            key={item.id}
            toggle={<ToggleTask taskId={item.id} />}
            ref={item.id === taskInCreation ? createdTaskRef : undefined}
          />
        ))} */}
      </div>

      {/* <IconButton
        aria-label="New Task"
        icon={<AddIcon />}
        onClick={() => onNewTask()}
      ></IconButton> */}
    </CardMain>
  );
});
