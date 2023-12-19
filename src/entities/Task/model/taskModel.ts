import { LOGGER } from 'shared/lib';
import { rootStore } from 'shared/model';
import type { TasksStore } from 'shared/model';

class TaskModel {
  constructor(public store: TasksStore) {
    //
  }

  get tasksConfig() {
    return this.store.config;
  }

  get isTimerActive() {
    return this.store.root.modules.timer.isActive;
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
      //unfocuse previously focused item
      if (focused) this.store.setItemFocused(focused.id, false);
      //set focused only if focused item is not the same as the one we are trying to focus
      if (focused?.id !== id) {
        this.store.setItemFocused(id);
      }
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

  setEditedItemPomodoros(total: number, passed: number) {
    if (!this.store.taskBeingEdited) return;
    LOGGER.debug('misc', `set pomodoro data for item ${total} ${passed}`);
    let totalChecked = total;
    let spendChecked = passed;
    //check limits
    if (totalChecked > this.tasksConfig.taskMaxPomodoros.value)
      totalChecked = this.tasksConfig.taskMaxPomodoros.value;
    if (spendChecked > this.tasksConfig.taskMaxPomodoros.value)
      spendChecked = this.tasksConfig.taskMaxPomodoros.value;
    //check if total is more or equal passed
    if (totalChecked < spendChecked) spendChecked = totalChecked;
    //upd task
    this.store.taskBeingEdited.timeAll = totalChecked;
    this.store.taskBeingEdited.timeSpent = spendChecked;
  }

  stopItemBeingEdited() {
    this.store.stopItemBeingEdited();
  }
}

export const taskModel = new TaskModel(rootStore.modules.tasks);
