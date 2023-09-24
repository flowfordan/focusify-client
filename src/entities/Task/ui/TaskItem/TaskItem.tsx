import { observer } from 'mobx-react-lite';
import { Btn, Input } from 'shared/ui';
import { TaskItemProps } from './TaskItem.props';
import cn from 'classnames';
import styles from './TaskItem.module.scss';
import { ForwardedRef, forwardRef } from 'react';

export const TaskItem = observer(
  forwardRef(function Task(
    { taskData, toggle, isExpanded = false, ...props }: TaskItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    return (
      <div
        className={cn(styles.taskItem, {
          [styles.expanded]: isExpanded,
        })}
        ref={ref}
        {...props}
      >
        <span>{toggle}</span>
        <span>{taskData.title}</span>
        <span>{taskData.description}</span>
        <span>{isExpanded ? 'expanded' : ''}</span>
        <span>Progress</span>
        <Btn>Expand</Btn>
        {/* <span>
          <Input />
        </span> */}
      </div>
    );
  })
);
