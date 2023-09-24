'use client';
import { TaskItem, TaskItemExt } from 'entities/Task';
import { ToggleTask } from 'features/Task';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import cn from 'classnames';
import { useTasksModel } from 'shared/providers';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import { useEffect, useRef } from 'react';

interface ITasksWidgetProps {
  className?: string;
}

export const Tasks = observer(({ className }: ITasksWidgetProps) => {
  const tasksModel = useTasksModel();
  const tasks = tasksModel.tasks;
  const taskInCreation = tasksModel.taskInCreation;
  //scroll to new element
  const createdTaskRef = useRef<HTMLDivElement>(null);

  const onNewTask = () => {
    tasksModel.createTask();
  };

  useEffect(() => {
    console.log('new task', createdTaskRef.current);
    if (createdTaskRef.current) {
      createdTaskRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [taskInCreation]);

  return (
    <Card className={cn(className, styles.wrapper)}>
      <CardHeader>
        <Heading size={'md'}>Tasks List</Heading>
      </CardHeader>
      <div>Close widget</div>

      <div className={styles.list}>
        {tasks.map((item) => (
          <TaskItem
            isExpanded={item.isExpanded}
            taskData={item}
            key={item.id}
            toggle={<ToggleTask taskId={item.id} />}
            ref={item.id === taskInCreation ? createdTaskRef : undefined}
          />
        ))}
      </div>

      <IconButton
        aria-label="New Task"
        icon={<AddIcon />}
        onClick={() => onNewTask()}
      ></IconButton>
    </Card>
  );
});
