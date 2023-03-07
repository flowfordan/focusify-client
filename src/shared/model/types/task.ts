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
