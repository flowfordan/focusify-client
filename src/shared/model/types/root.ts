import { ISoundsModel } from './sounds';
import { ITasksModel } from './task';

export interface IRootModel {
  tasks: ITasksModel;
  sounds: ISoundsModel;
  setTasks: () => void;
}
