import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { ITask } from 'shared/model';

export interface TaskItemListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  taskData: ITask;
  toggle: ReactNode;
}