import { taskModel } from 'entities/Task';
import { ToggleTaskProps } from './ToggleTask.props';
import { observer } from 'mobx-react-lite';

export const ToggleTask = observer(({ taskId }: ToggleTaskProps) => {
  const task = taskModel.getTask(taskId);
  if (!task) return null;

  //TODO get ui lib component
  return (
    <input
      type="checkbox"
      checked={task.isCompleted}
      onClick={() => taskModel.toggleTask(taskId)}
      readOnly
    />
  );
});