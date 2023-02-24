import { taskModel } from "entities/Task";
import { TaskItem } from "entities/Task";
import { ToggleTask } from "features/Task";
import { observer } from "mobx-react-lite"

export const Tasks = observer(() => {
  const tasks = taskModel.tasks;
  return(
    <div>
      <div>Tasks List</div>
      <div>{tasks.map(item => {
        return (
          <TaskItem taskData={item}  key={item.id} toggle={<ToggleTask taskId={item.id}/>}/>)
      })}</div>
    </div>
  )
})