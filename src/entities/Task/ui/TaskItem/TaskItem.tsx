import { observer } from 'mobx-react-lite';
import { Input } from 'shared/ui';
import { TaskItemProps } from './TaskItem.props';
import './taskItem.scss';

export const TaskItem = observer(
  ({ taskData, toggle, isExpanded = false, ...props }: TaskItemProps) => {
    const RegularItem = () => {
      return (
        <div className="taskItem" {...props}>
          <span>{toggle}</span>
          <span>{taskData.title}</span>
          <span>{taskData.description}</span>
          <span>
            <Input />
          </span>
        </div>
      );
    };
    const ExpItem = () => {
      return (
        <div className="taskItem--expanded" {...props}>
          <span>{toggle}</span>
          <span>{taskData.title}</span>
          <span>{taskData.description}</span>
          <span>
            <Input />
          </span>
        </div>
      );
    };
    return isExpanded ? <ExpItem /> : <RegularItem />;
  }
);
