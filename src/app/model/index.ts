import { SoundsModel } from 'entities/Sound';
import { TasksModel } from 'entities/Task';
import { IRootModel } from 'shared/model';

export class AppModel implements IRootModel {
  tasks: TasksModel;
  // timer: string;
  sounds: SoundsModel;
  constructor() {
    this.sounds = new SoundsModel(this);
    this.tasks = new TasksModel(this);
  }

  setTasks() {
    //
  }
}

export const appModel = new AppModel();
