export interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isFocused: boolean;
  isBeingEdited: boolean;
  timeAll: number;
  timeSpent: number;
  timeRemain: number;
}

export interface ITaskEdited {
  id: string;
  title: string;
  description: string;
  timeAll: number;
  timeSpent: number;
  timeRemain: number;
}

export interface ITasksModel {
  tasks: Array<ITask>;
  taskInCreation: string | null;
  getTask: (taskId: ITask['id']) => ITask | undefined;
  toggleTask: (taskId: ITask['id']) => void;
  createTask: () => void;
}
