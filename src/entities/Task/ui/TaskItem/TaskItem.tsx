import { observer } from 'mobx-react-lite';
import { TaskItemProps } from './TaskItem.props';
import cn from 'classnames';
import styles from './taskItem.module.scss';
import { ForwardedRef, forwardRef } from 'react';
import { Btn, CardMain, Typography } from 'shared/ui';
import { Checkbox } from 'primereact/checkbox';

export const TaskItem = observer(
  forwardRef(function Task(
    {
      taskData,
      toggle,
      isFocused,
      isCompleted,
      isExpanded = false,
      ...props
    }: TaskItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    return (
      <CardMain
        hatch={isFocused ? 'dots' : isCompleted ? 'lines' : undefined}
        className={cn(styles.taskItem, {
          [styles.expanded]: isExpanded,
          [styles.focused]: isFocused,
          [styles.completed]: isCompleted,
        })}
        ref={ref}
        {...props}
      >
        <div
          className={cn(styles.label, {
            [styles.focused]: isFocused,
          })}
        >
          <i className="pi pi-bolt"></i>
        </div>
        <div className={styles.main}>
          <div className={styles.checkWrap}>
            <div className={styles.checkbox}>
              <Checkbox
                inputId={''}
                name="module"
                value={''}
                onChange={() => {}}
                checked={isCompleted ?? false}
                disabled={false}
              />
            </div>
          </div>
          <div className={styles.info}>
            <Typography Tag="h3" type="t2">
              Title
            </Typography>
            <div>Description</div>
          </div>
        </div>
        <div className={styles.removeWrap}>
          <Btn iconPrime={'pi-times'} />
        </div>
      </CardMain>
    );
  })
);
