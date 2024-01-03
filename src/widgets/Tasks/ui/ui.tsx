'use client';
import { TaskItem, TaskItemExt, TasksConfig } from 'entities/Task';
import { ToggleTask } from 'features/Task';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import cn from 'classnames';
import { useTasksStore, useUIStore } from 'shared/providers';
import { useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { CardMain, OutsideClickHandler } from 'shared/ui';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { tasksWidgetModel } from '../model/tasksWidgetModel';
import Image from 'next/image';
import { ModalMenu } from 'shared/templates';

interface ITasksWidgetProps {
  className?: string;
}

export const Tasks = observer(({ className }: ITasksWidgetProps) => {
  const tasksStore = useTasksStore();
  const uiStore = useUIStore();
  const tasks = tasksStore.tasks;
  const tasksConfig = tasksStore.config;
  const taskBeingEdited = tasksStore.taskBeingEdited;
  const tasksCount = tasksStore.tasksCount;
  const tasksDoneCount = tasksStore.tasksDoneCount;
  const isConfigMenuOpen = uiStore.isModuleConfigMenuOpen('tasks');
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

  const onOptionsMenuToggle = (open: boolean) => {
    uiStore.setModuleConfigMenuOpen('tasks', open);
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <span className={styles.manage}>
          <Button
            title="ToDo Options"
            icon="pi pi-cog"
            text
            severity="secondary"
            aria-label="ToDo Options"
            size="small"
            onClick={() => onOptionsMenuToggle(true)}
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
              <svg>
                <use href={'/images/todo_bg.svg#bg'} />
              </svg>
              {'Add new tasks to get started ↓'}
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
            aria-label="New Task"
            size="small"
            onClick={() => onNewTask()}
            disabled={tasksCount >= tasksConfig.maxTasks.value}
          />
        </div>
      </div>
      <ModalMenu
        visible={isConfigMenuOpen}
        onClose={() => onOptionsMenuToggle(false)}
      >
        <TasksConfig onClose={() => onOptionsMenuToggle(false)} />
      </ModalMenu>
    </div>
  );
});
