import { TaskItemListProps } from "./TaskItemList.props";
import './taskItemList.scss';

export const TaskItemList = ({taskData, toggle}: TaskItemListProps) => {
  //data
  return(
    <div className='taskItemList'>
      <span>{toggle}</span>
      <span>{taskData.title}</span>
      <span>{taskData.description}</span>
    </div>
  )
}