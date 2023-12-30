import { observer } from 'mobx-react-lite';
import { Typography } from 'shared/ui';
import styles from './TimerConfig.module.scss';
import { taskModel } from 'entities/Task';
import { TaskConfigKey, TimerConfigKey } from 'shared/config';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { timerModel } from 'entities/Timer';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';

interface TimerConfigProps {
  className?: string;
  onClose: () => void;
}

export const TimerConfig = observer(({ onClose }: TimerConfigProps) => {
  const [touched, setIsTouched] = useState(false);
  const config = timerModel.config;

  const handleChange = (config: TimerConfigKey, value: boolean | number) => {
    if (!touched) setIsTouched(true);
    timerModel.updateConfigOption(config, value);
  };

  const onSave = () => {
    timerModel.save();
    setIsTouched(false);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{'Pomodoro: options'}</div>
      <div className={styles.content}>
        <ul className={styles.list}>
          {Object.keys(config).map((key) => {
            const option = config[key as TimerConfigKey];
            if (option.configurable)
              return (
                <li className={styles.item} key={key}>
                  <span>{option.displayName || option.name}</span>
                  <span className={styles.action}>
                    {typeof option.value === 'boolean' && (
                      <InputSwitch
                        checked={option.value}
                        onChange={(e) =>
                          handleChange(key as TimerConfigKey, !option.value)
                        }
                      />
                    )}
                    {typeof option.value === 'number' && (
                      <InputNumber
                        value={option.value}
                        onValueChange={(e) =>
                          handleChange(key as TimerConfigKey, e.value as number)
                        }
                        showButtons
                        min={option.min}
                        max={option.max}
                        decrementButtonClassName="p-button-secondary"
                        incrementButtonClassName="p-button-secondary"
                        title={'pomodoros passed'}
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
