export interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isFocused: boolean;
  isExpanded: boolean;
  timeAll: number;
  timeSpent: number;
  timeRemain: number;
}

export interface ITasksModel {
  tasks: Array<ITask>;
  getTask: (taskId: ITask['id']) => ITask | undefined;
  toggleTask: (taskId: ITask['id']) => void;
}
