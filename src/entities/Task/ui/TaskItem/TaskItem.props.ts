import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { ITask, ITaskEdited } from 'shared/model';

export interface TaskItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  taskData: ITask;
  toggle: ReactNode;
  editData: ITaskEdited | null;
  isFocused?: boolean;
  isCompleted?: boolean;
}
