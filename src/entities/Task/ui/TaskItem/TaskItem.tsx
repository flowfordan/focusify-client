import { observer } from 'mobx-react-lite';
import { IconButton } from '@chakra-ui/react';
import { TaskItemProps } from './TaskItem.props';
import cn from 'classnames';
import styles from './TaskItem.module.scss';
import { ForwardedRef, forwardRef } from 'react';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

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
        <div>
          <Checkbox size="lg" defaultChecked />
        </div>
        <div className={styles.main}>
          <div>{taskData.title}</div>
          <div>{taskData.description}</div>
        </div>
        <div className={styles.removeWrap}>
          <IconButton
            isRound={true}
            variant="solid"
            size={'xs'}
            aria-label="Done"
            fontSize="20px"
            icon={<CloseIcon boxSize={2} />}
          />
        </div>
        {/* <span>{taskData.title}</span>
        <span>{taskData.description}</span>
        <span>{isExpanded ? 'expanded' : ''}</span>
        <span>Progress</span> */}
        {/* <Btn>Expand</Btn> */}
        {/* <span>
          <Input />
        </span> */}
      </div>
    );
  })
);
