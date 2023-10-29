import { makeAutoObservable, runInAction } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';
import { ITask } from './types/task';
import { _mockTasks } from 'shared/config';

//TODO method to work with local storage
//on init: get data from LS
//on change: set data to LS (bind upd to some methods)
export class TasksStore implements ModuleStore {
  private _isActive: boolean;
  isAvailable: boolean;
  root: RootStore;
  tasks: Array<ITask>;
  taskIdBeingEdited: string | null = null;
  constructor(root: RootStore) {
    this.root = root;
    this._isActive = true;
    this.isAvailable = true;
    this.tasks = _mockTasks;

    makeAutoObservable(this);
  }

  set isActive(value: boolean) {
    this._isActive = value;
    this.root.countActiveModules();
  }

  get isActive() {
    return this._isActive;
  }

  toggleModuleActive() {
    this.isActive = !this.isActive;
  }

  setItemFocused(itemId: string, isFocused?: boolean) {
    const item = this.tasks.find((t) => t.id === itemId);
    if (!item) return;
    if (isFocused !== undefined) {
      item.isFocused = isFocused;
    } else {
      item.isFocused = !item.isFocused;
    }
  }

  toggleItemCompleted(itemId: string) {
    const item = this.tasks.find((t) => t.id === itemId);
    if (!item) return;
    item.isCompleted = !item.isCompleted;
    if (item.isCompleted) {
      runInAction(() => {
        item.isFocused = false;
      });
    }
  }
}
