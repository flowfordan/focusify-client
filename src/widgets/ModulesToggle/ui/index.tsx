'use client';
import { Button } from 'primereact/button';
import styles from './Modules.Toggle.module.scss';
import { useState } from 'react';
import cn from 'classnames';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { ModuleId, modulesData } from 'shared/config';
import {
  useRootStore,
  useSoundsStore,
  useTasksStore,
  useTimerStore,
} from 'shared';
import { observer } from 'mobx-react-lite';
interface ModulesToggleWidgetProps {
  className?: string;
}

export const ModulesToggleWidget = observer(
  ({ className }: ModulesToggleWidgetProps) => {
    const [open, setOpen] = useState(false);
    const rootStore = useRootStore();

    const isModuleActive = (id: ModuleId) => {
      return rootStore.modules[id].isActive;
    };
    const isModuleAvailable = (id: ModuleId) => {
      return rootStore.modules[id].isAvailable;
    };
    const handleChange = (id: ModuleId) => {
      rootStore.modules[id].toggleModuleActive();
    };

    const handleOpen = () => {
      setOpen((prev) => !prev);
    };
    return (
      <div className={styles.wrapper}>
        <div
          className={cn(styles.body, {
            [styles.visible]: open,
          })}
        >
          <Card>
            <div className={styles.list}>
              {modulesData.map((m) => {
                return (
                  <div className={styles.item} key={m.id}>
                    <label htmlFor={m.id} className="ml-2">
                      {m.name}
                    </label>
                    <Checkbox
                      inputId={m.id}
                      name="module"
                      value={m.id}
                      onChange={() => handleChange(m.id)}
                      checked={isModuleActive(m.id)}
                      disabled={!isModuleAvailable(m.id)}
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <Button
          icon="pi pi-plus"
          rounded
          aria-label="Modules"
          onClick={() => handleOpen()}
        />
      </div>
    );
  }
);
