import { TaskItemProps } from "./TaskItem.props";
import './taskItem.scss';

export const TaskItem = ({taskData, toggle}: TaskItemProps) => {
  //data
  return(
    <div className='taskItem'>
      <span>{toggle}</span>
      <span>{taskData.title}</span>
      <span>{taskData.description}</span>
    </div>
  )
}