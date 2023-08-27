import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { ITask } from 'shared/model';

export interface TaskItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  taskData: ITask;
  toggle: ReactNode;
  isExpanded?: boolean;
}
