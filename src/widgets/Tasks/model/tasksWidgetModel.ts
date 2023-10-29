import { rootStore } from 'shared/model';
import type { TasksStore } from 'shared/model';

class TasksWidgetModel {
  constructor(public store: TasksStore) {
    //
  }

  addNewTask() {
    this.store.addNewItem();
  }
}

export const tasksWidgetModel = new TasksWidgetModel(rootStore.modules.tasks);
