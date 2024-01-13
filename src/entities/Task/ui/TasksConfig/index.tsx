import { observer } from 'mobx-react-lite';
import { Typography } from 'shared/ui';
import styles from './TasksConfig.module.scss';
import { taskModel } from 'entities/Task';
import { TaskConfigKey } from 'shared/config';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { useState } from 'react';

interface TasksConfigProps {
  className?: string;
  onClose: () => void;
}

export const TasksConfig = observer(({ onClose }: TasksConfigProps) => {
  const [touched, setIsTouched] = useState(false);
  const config = taskModel.tasksConfig;

  const handleChange = (config: TaskConfigKey, value: boolean) => {
    if (!touched) setIsTouched(true);
    taskModel.updateConfigOption(config, value);
  };

  const onSave = () => {
    taskModel.save();
    setIsTouched(false);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{'To-do: options'}</div>
      <div className={styles.content}>
        <ul className={styles.list}>
          {Object.keys(config).map((key) => {
            const option = config[key as TaskConfigKey];
            if (option.configurable)
              return (
                <li className={styles.item} key={key}>
                  <span>{option.displayName || option.name}</span>
                  <span>
                    {typeof option.value === 'boolean' && (
                      <InputSwitch
                        checked={option.value}
                        onChange={(e) =>
                          handleChange(key as TaskConfigKey, !option.value)
                        }
                      />
                    )}
                  </span>
                </li>
              );
          })}
        </ul>
      </div>
      <div className={styles.footer}>
        <Button
          icon="pi pi-save"
          label="Save"
          rounded
          aria-label="Save changes"
          onClick={() => onSave()}
          disabled={!touched}
        />
      </div>
    </div>
  );
});
