'use client';
import { TaskItem, TaskItemExt } from 'entities/Task';
import { ToggleTask } from 'features/Task';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import cn from 'classnames';
import { useTasksStore } from 'shared/providers';
import { useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { CardMain, OutsideClickHandler } from 'shared/ui';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { tasksWidgetModel } from '../model/tasksWidgetModel';
import Image from 'next/image';

interface ITasksWidgetProps {
  className?: string;
}

export const Tasks = observer(({ className }: ITasksWidgetProps) => {
  const tasksStore = useTasksStore();
  const tasks = tasksStore.tasks;
  const tasksConfig = tasksStore.config;
  const taskBeingEdited = tasksStore.taskBeingEdited;
  const tasksCount = tasksStore.tasksCount;
  const tasksDoneCount = tasksStore.tasksDoneCount;
  //TODO scroll to new element
  const editedRef = useRef<HTMLDivElement>(null);

  const onNewTask = () => {
    tasksWidgetModel.addNewTask();
  };

  const cleanUpTasks = () => {
    tasksStore.cleanUpTasksList();
  };

  const onOutsideClick = () => {
    tasksStore.stopItemBeingEdited();
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <span className={styles.manage}>
          <Button
            title="Options"
            icon="pi pi-cog"
            text
            disabled
            severity="secondary"
            aria-label="Options"
            size="small"
            onClick={() => {}}
          />
          <Button
            title="Sort"
            icon="pi pi-sort-amount-up"
            text
            disabled
            severity="secondary"
            aria-label="Sort"
            size="small"
            onClick={() => {}}
          />
        </span>
        <span className={styles.progress}>
          {tasksCount === 0
            ? 'no tasks'
            : `finished ${tasksDoneCount} of ${tasksCount}`}
        </span>
        <span>
          <Button
            title="Clean up tasks list"
            icon="pi pi-trash"
            text
            severity="secondary"
            aria-label="Clean up tasks"
            size="small"
            onClick={() => cleanUpTasks()}
          />
        </span>
      </div>
      <div className={styles.listWrap}>
        <div className={styles.list}>
          {tasks.length === 0 && (
            <div className={styles.emptyWrap}>
              <img src="/images/todo_bg.png" />
            </div>
          )}
          {tasks.map((item) => {
            if (taskBeingEdited && taskBeingEdited?.id === item.id) {
              return (
                <OutsideClickHandler
                  key={item.id}
                  onOutsideClick={() => onOutsideClick()}
                >
                  <TaskItem
                    editData={taskBeingEdited}
                    isFocused={item.isFocused}
                    isCompleted={item.isCompleted}
                    taskData={item}
                    key={item.id}
                    toggle={<ToggleTask taskId={item.id} />}
                    ref={editedRef}
                  />
                </OutsideClickHandler>
              );
            } else
              return (
                <TaskItem
                  editData={null}
                  isFocused={item.isFocused}
                  isCompleted={item.isCompleted}
                  taskData={item}
                  key={item.id}
                  toggle={<ToggleTask taskId={item.id} />}
                />
              );
          })}
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
            disabled={tasksCount >= tasksConfig.maxTasks.value}
          />
        </div>
      </div>
    </div>
  );
});
