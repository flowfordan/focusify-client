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
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { tasksWidgetModel } from '../model/tasksWidgetModel';

interface ITasksWidgetProps {
  className?: string;
}

export const Tasks = observer(({ className }: ITasksWidgetProps) => {
  const tasksModel = useTasksStore();
  const tasks = tasksModel.tasks;
  const taskBeingEdited = tasksModel.taskIdBeingEdited;
  //scroll to new element
  const createdTaskRef = useRef<HTMLDivElement>(null);

  const onNewTask = () => {
    tasksWidgetModel.addNewTask();
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <span>Sort</span>
        <span>Progress</span>
        <span>CleanUp</span>
      </div>
      <div className={styles.listWrap}>
        <div className={styles.list}>
          {tasks.map((item) => (
            <TaskItem
              isExpanded={item.isExpanded}
              isFocused={item.isFocused}
              isCompleted={item.isCompleted}
              taskData={item}
              key={item.id}
              toggle={<ToggleTask taskId={item.id} />}
              ref={item.id === taskBeingEdited ? createdTaskRef : undefined}
            />
          ))}
        </div>
        <div className={styles.btn}>
          <Button
            icon="pi pi-plus"
            raised
            rounded
            severity="secondary"
            aria-label="New Task"
            size="small"
            onClick={() => onNewTask()}
          />
        </div>
      </div>
    </div>
  );
});
