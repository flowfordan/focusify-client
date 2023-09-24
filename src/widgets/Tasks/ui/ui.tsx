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

interface ITasksWidgetProps {
  className?: string;
}

export const Tasks = observer(({ className }: ITasksWidgetProps) => {
  const tasksModel = useTasksModel();
  const tasks = tasksModel.tasks;

  const onNewTask = () => {};

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
