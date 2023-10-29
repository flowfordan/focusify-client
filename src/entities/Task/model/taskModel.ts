import { rootStore } from 'shared/model';
import type { TasksStore } from 'shared/model';

class TaskModel {
  constructor(public store: TasksStore) {
    //
  }

  setItemFocused(id?: string) {
    //if dont have id
    //unfocus any in focus
    if (!id || id.length < 1) {
      //
    } else {
      //if have id, set item focused
      //unfocuse previouse focus
      const focused = this.store.tasks.find((t) => t.isFocused);
      if (focused) this.store.setItemFocused(focused.id, false);
      this.store.setItemFocused(id);
    }
  }

  toggleItemCompleted(id: string) {
    this.store.toggleItemCompleted(id);
  }
}

export const taskModel = new TaskModel(rootStore.modules.tasks);
