import { TaskItemExtProps } from "./TaskItemExt.props";
import './taskItemExt.scss';

export const TaskItemExt = ({taskData, toggle}: TaskItemExtProps) => {
  //data
  return(
    <div className='taskItem'>
      <span>{toggle}</span>
      <span>{taskData.title}</span>
      <span>{taskData.description}</span>
    </div>
  )
}