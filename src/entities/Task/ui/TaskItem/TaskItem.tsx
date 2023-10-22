import { observer } from 'mobx-react-lite';
import { TaskItemProps } from './TaskItem.props';
import cn from 'classnames';
import styles from './taskItem.module.scss';
import { ForwardedRef, forwardRef } from 'react';
import { CardMain, Typography } from 'shared/ui';
import { Checkbox } from 'primereact/checkbox';

export const TaskItem = observer(
  forwardRef(function Task(
    { taskData, toggle, isExpanded = false, ...props }: TaskItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    return (
      <CardMain
        border
        className={cn(styles.taskItem, {
          [styles.expanded]: isExpanded,
        })}
        ref={ref}
        {...props}
      >
        <div>F</div>
        <div className={styles.main}>
          <div className={styles.checkWrap}>
            <div className={styles.checkbox}>
              <Checkbox
                inputId={''}
                name="module"
                value={''}
                onChange={() => {}}
                checked={true}
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
          {/* <IconButton
            isRound={true}
            variant="solid"
            size={'xs'}
            aria-label="Done"
            fontSize="20px"
            icon={<CloseIcon boxSize={2} />} */}
          {/* /> */}
        </div>
      </CardMain>
    );
  })
);
