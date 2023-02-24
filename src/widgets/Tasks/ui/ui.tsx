import { taskModel } from "entities/Task";
import { TaskItemList } from "entities/Task";
import { ToggleTask } from "features/Task";
import { observer } from "mobx-react-lite"

export const Tasks = observer(() => {
  const tasks = taskModel.tasks;
  return(
    <div>
      <div>Tasks List</div>
      <div>{tasks.map(item => {
        return (
          <TaskItemList taskData={item}  key={item.id} toggle={<ToggleTask taskId={item.id}/>}/>)
      })}</div>
    </div>
  )
})