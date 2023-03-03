import { observer } from "mobx-react-lite";
import { TaskItemProps } from "./TaskItem.props";
import './taskItem.scss';

export const TaskItem = observer(({taskData, toggle, ...props}: TaskItemProps) => {
  //data
  return(
    <div className='taskItem' {...props}>
      <span>{toggle}</span>
      <span>{taskData.title}</span>
      <span>{taskData.description}</span>
    </div>
  )
})