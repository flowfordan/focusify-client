import styles from './ui.module.scss';
import cn from 'classnames';
interface ITimerWidgetProps {
  className?: string;
}

export const Timer = ({ className }: ITimerWidgetProps) => {
  //
  return <div className={cn(className, styles.wrapper)}>Timer Widget</div>;
};
