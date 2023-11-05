import { observer } from 'mobx-react-lite';
import { TaskItemProps } from './TaskItem.props';
import cn from 'classnames';
import styles from './taskItem.module.scss';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  useState,
} from 'react';
import { Btn, CardMain, Typography } from 'shared/ui';
import { Checkbox } from 'primereact/checkbox';
import { taskModel } from 'entities/Task';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

export const TaskItem = observer(
  forwardRef(function Task(
    {
      taskData,
      toggle,
      isFocused,
      isCompleted,
      isExpanded,
      ...props
    }: TaskItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    const onToggleFocused = (id: string) => {
      taskModel.setItemFocused(id);
    };
    const onToggleCompleted = (id: string) => {
      taskModel.toggleItemCompleted(id);
    };
    const onItemRemove = (id: string) => {
      taskModel.removeItem(id);
    };
    const onItemBeingEdited = (id: string) => {
      taskModel.setItemAsBeingEdited(id);
    };
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
        {isCompleted ? (
          <div></div>
        ) : (
          <FocusBtn
            className={styles.focusBtnWrap}
            isFocused={isFocused}
            unavailable={isCompleted}
            onClick={() => onToggleFocused(taskData.id)}
          />
        )}
        <div className={styles.main}>
          <div className={styles.checkWrap}>
            <div className={styles.checkbox}>
              <Checkbox
                inputId={'Task Complition'}
                name="module"
                value={''}
                onChange={() => onToggleCompleted(taskData.id)}
                checked={isCompleted ?? false}
                disabled={false}
              />
            </div>
          </div>
          {isExpanded ? (
            <div className={styles.infoEdit}>
              <ItemEditSection
                initDescr={taskData.description}
                initTitle={taskData.title}
              />
            </div>
          ) : (
            <button
              className={styles.info}
              onClick={() => onItemBeingEdited(taskData.id)}
            >
              <Typography Tag="h3" type="t2">
                {taskData.title}
              </Typography>
              <div>Description</div>
            </button>
          )}
        </div>
        <div className={styles.removeWrap}>
          <Btn
            iconPrime={'pi-times'}
            onClick={() => onItemRemove(taskData.id)}
          />
        </div>
      </CardMain>
    );
  })
);

interface FocusBtnProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  isFocused?: boolean;
  unavailable?: boolean;
}

const FocusBtn = ({
  className,
  isFocused,
  unavailable,
  ...props
}: FocusBtnProps) => {
  return (
    <button
      className={cn(className, styles.focusBtn, {
        [styles.active]: isFocused,
        [styles.unavailable]: unavailable,
      })}
      disabled={unavailable}
      {...props}
    >
      <i className="pi pi-bolt"></i>
    </button>
  );
};

interface ItemEditSectionProps {
  initTitle: string;
  initDescr: string;
  initPomodoro?: number;
}

const ItemEditSection = ({ initDescr, initTitle }: ItemEditSectionProps) => {
  const [title, setTitle] = useState(initTitle);
  const [descr, setDescr] = useState(initDescr);
  return (
    <>
      <div className={styles.titleEdit}>
        <InputText autoFocus value={title} />
      </div>
      <div className={styles.descrEdit}>
        <InputTextarea value={descr} style={{ resize: 'none' }} />
      </div>
      <div>Pomodoro</div>
    </>
  );
};
