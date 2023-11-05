import { LOGGER } from 'shared/lib';
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

  removeItem(id: string) {
    this.store.removeItem(id);
  }

  setItemAsBeingEdited(id: string) {
    this.store.setItemAsBeingEdited(id);
  }

  setEditedItemData(title: string, description: string) {
    if (!this.store.taskBeingEdited) return;
    LOGGER.debug('misc', `set data for item ${title} ${description}`);
    this.store.taskBeingEdited.title = title;
    this.store.taskBeingEdited.description = description;
  }

  stopItemBeingEdited() {
    this.store.stopItemBeingEdited();
  }
}

export const taskModel = new TaskModel(rootStore.modules.tasks);
