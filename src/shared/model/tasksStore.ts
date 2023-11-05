/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';
import { ITask } from './types/task';
import { _mockTasks } from 'shared/config';
import { STORAGE } from 'shared/lib';

const getNullTask = (): ITask => {
  return {
    id: new Date().getTime().toString(),
    title: 'New Task',
    description: '',
    isCompleted: false,
    isFocused: false,
    isBeingEdited: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  };
};

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
    this.tasks = [];

    makeAutoObservable(this);
  }

  //write decorator method that calls write to ls method
  writeToLS() {
    //
  }

  init() {
    this.loadTasksFromStorage();
    //temp
    // this.tasks = _mockTasks;
  }

  set isActive(value: boolean) {
    this._isActive = value;
    this.root.countActiveModules();
  }

  get isActive() {
    return this._isActive;
  }

  private getItemById(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  private _updateStorage() {
    STORAGE.set('tasks', this.tasks);
  }

  private loadTasksFromStorage() {
    const savedData = STORAGE.get('tasks');
    this.tasks = savedData ? savedData : [];
  }

  toggleModuleActive() {
    this.isActive = !this.isActive;
  }

  setItemFocused(itemId: string, isFocused?: boolean) {
    const item = this.getItemById(itemId);
    if (!item) return;
    if (isFocused !== undefined) {
      item.isFocused = isFocused;
    } else {
      item.isFocused = !item.isFocused;
    }
    this._updateStorage();
  }

  toggleItemCompleted(itemId: string) {
    const item = this.getItemById(itemId);
    if (!item) return;
    item.isCompleted = !item.isCompleted;
    if (item.isCompleted) {
      runInAction(() => {
        item.isFocused = false;
      });
    }
    this._updateStorage();
  }

  setItemAsBeingEdited(itemId: string, isBeingEdited?: boolean) {
    //if any of items are being edited - set them as not being edited
    this.tasks.forEach((t) => {
      if (t.isBeingEdited) {
        t.isBeingEdited = false;
      }
    });
    //TODO: check if item is already being edited
    const item = this.getItemById(itemId);
    if (!item) return;
    if (isBeingEdited !== undefined) {
      item.isBeingEdited = isBeingEdited;
    } else {
      item.isBeingEdited = !item.isBeingEdited;
    }
  }

  removeItem(itemId: string) {
    const index = this.tasks.findIndex((t) => t.id === itemId);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
    this._updateStorage();
  }

  addNewItem() {
    this.tasks.push(getNullTask());
    this._updateStorage();
  }

  subscribeToChanges() {
    reaction(
      () => {
        return this.tasks.length;
      },
      () => {
        console.log('CHANGES IN TASKS');
      },
      {
        fireImmediately: false,
      }
    );
  }
}
