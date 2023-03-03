import { taskModel } from "entities/Task";
import { ITask } from "shared/model";

export const expandTask = (taskId: ITask['id']) => {
  taskModel.expandTask(taskId);
}
