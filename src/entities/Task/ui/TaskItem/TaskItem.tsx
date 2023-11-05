import { observer } from 'mobx-react-lite';
import { TaskItemProps } from './TaskItem.props';
import cn from 'classnames';
import styles from './taskItem.module.scss';
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Btn, CardMain, Typography } from 'shared/ui';
import { Checkbox } from 'primereact/checkbox';
import { taskModel } from 'entities/Task';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ITaskEdited } from 'shared/model';

export const TaskItem = observer(
  forwardRef(function Task(
    {
      taskData,
      toggle,
      isFocused,
      isCompleted,
      editData,
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
          [styles.expanded]: editData,
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
          {editData ? (
            <div className={styles.infoEdit}>
              <ItemEditSection data={editData} />
            </div>
          ) : (
            <button
              className={styles.info}
              onClick={() => onItemBeingEdited(taskData.id)}
            >
              <Typography Tag="h3" type="t2">
                {taskData.title}
              </Typography>
              <div className={styles.description}>{taskData.description}</div>
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
  data: ITaskEdited;
}

const ItemEditSection = ({ data }: ItemEditSectionProps) => {
  const [title, setTitle] = useState(data.title);
  const [descr, setDescr] = useState(data.description);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 120) return;
    setTitle(value);
  };
  const handleChangeDescr = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 300) return;
    setDescr(value);
  };

  useEffect(() => {
    taskModel.setEditedItemData(title, descr);
    // timerRef.current = setTimeout(() => {
    //   taskModel.setEditedItemData(title, descr);
    // }, 2000);
    // return () => {
    //   timerRef.current && clearTimeout(timerRef.current);
    // };
  }, [title, descr]);

  useEffect(() => {
    return () => {
      console.log('unmount item edit');
      taskModel.setEditedItemData(title, descr);
      // timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <div className={styles.titleEdit}>
        <InputText
          autoFocus
          value={title}
          onChange={(e) => handleChangeTitle(e)}
        />
      </div>
      <div className={styles.descrEdit}>
        <InputTextarea
          value={descr}
          style={{ resize: 'none' }}
          onChange={(e) => handleChangeDescr(e)}
        />
      </div>
      <div>Pomodoro</div>
    </>
  );
};
