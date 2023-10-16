'use client';
import { Button } from 'primereact/button';
import styles from './Modules.Toggle.module.scss';
import { useState } from 'react';
import cn from 'classnames';
import { Card } from 'primereact/card';
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
        <div>fffffffffffffffff</div>
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
