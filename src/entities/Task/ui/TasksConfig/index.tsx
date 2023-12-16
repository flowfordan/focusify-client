import { observer } from 'mobx-react-lite';
import { Typography } from 'shared/ui';
import styles from './TasksConfig.module.scss';

interface TasksConfigProps {
  className?: string;
}

export const TasksConfig = observer(({}: TasksConfigProps) => {
  return (
    <div className={styles.wrapper}>
      <Typography Tag="h3" type="t3">
        {'To-do: options'}
      </Typography>
      <div>Config</div>
    </div>
  );
});
