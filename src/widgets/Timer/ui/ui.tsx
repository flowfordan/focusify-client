import { Card } from 'primereact/card';
import styles from './ui.module.scss';
import cn from 'classnames';
import { CardMain } from 'shared/ui';
interface ITimerWidgetProps {
  className?: string;
}

export const Timer = ({ className }: ITimerWidgetProps) => {
  //
  return (
    <CardMain
      className={cn(className, styles.wrapper)}
      elevation
      bgType="contrast"
    >
      Timer Widget
    </CardMain>
  );
};
