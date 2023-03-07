import { observer } from "mobx-react-lite";
import { TaskItemExtProps } from "./TaskItemExt.props";
import "./taskItemExt.scss";

export const TaskItemExt = observer(
  ({ taskData, toggle, ...props }: TaskItemExtProps) => {
    //data
    return (
      <div className="taskItemExt" {...props}>
        <span>{toggle}</span>
        <span>{taskData.title}</span>
        <span>{taskData.description}</span>
      </div>
    );
  }
);
