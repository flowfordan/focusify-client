'use client';
import { taskModel, TaskItem, TaskItemExt } from "entities/Task";
import { expandTask, ToggleTask } from "features/Task";
import { observer } from "mobx-react-lite";

export const Tasks = observer(() => {
  const tasks = taskModel.tasks;
  return (
    <div>
      <div>Tasks List</div>
      <div>
        {tasks.map((item) => {
          if (item.isExpanded)
            return (
              <TaskItem
                isExpanded
                taskData={item}
                key={item.id}
                toggle={<ToggleTask taskId={item.id} />}
                onClick={() => expandTask(item.id)}
              />
            );
          return (
            <TaskItem
              taskData={item}
              key={item.id}
              toggle={<ToggleTask taskId={item.id} />}
              onClick={() => expandTask(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
});
