'use client';
import { Button } from 'primereact/button';
import styles from './Modules.Toggle.module.scss';
import { useState } from 'react';
import cn from 'classnames';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
interface ModulesToggleWidgetProps {
  className?: string;
}

export const ModulesToggleWidget = ({
  className,
}: ModulesToggleWidgetProps) => {
  const [open, setOpen] = useState(false);

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
          <div className="flex align-items-center">
            <Checkbox
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
              onChange={() => {}}
              checked={true}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Cheese
            </label>
          </div>
          <div>fffffffffffffffff</div>
          <div>fffffffffffffffff</div>
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
};
