import { Card } from 'primereact/card';
import styles from './ui.module.scss';
import cn from 'classnames';
interface ITimerWidgetProps {
  className?: string;
}

export const Timer = ({ className }: ITimerWidgetProps) => {
  //
  return <Card className={cn(className, styles.wrapper)}>Timer Widget</Card>;
};
