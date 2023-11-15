/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';
import { ITask, ITaskEdited } from './types/task';
import { _mockTasks } from 'shared/config';
import { STORAGE } from 'shared/lib';

const getNullTask = (): ITask => {
  return {
    id: new Date().getTime().toString(),
    title: 'New Task',
    description: '',
    isCompleted: false,
    isFocused: false,
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
  taskBeingEdited: ITaskEdited | null = null;
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

  get tasksCount() {
    return this.tasks.length;
  }

  get tasksDoneCount() {
    const finishedTasks = this.tasks.filter((t) => t.isCompleted);
    return finishedTasks.length;
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

  setItemAsBeingEdited(itemId: string) {
    if (this.taskBeingEdited?.id === itemId) return;
    //previous item being edited
    this.stopItemBeingEdited();
    //TODO: check if item is already being edited
    const item = this.getItemById(itemId);
    if (!item) return;
    this.taskBeingEdited = {
      id: item.id,
      title: item.title,
      description: item.description,
      timeAll: item.timeAll,
      timeSpent: item.timeSpent,
      timeRemain: item.timeRemain,
    };
  }

  // setEditedItemData(title: string, description: string) {
  //   if (!this.taskBeingEdited) return;
  //   this.taskBeingEdited.title = title;
  //   this.taskBeingEdited.description = description;
  // }

  stopItemBeingEdited() {
    //save made changes
    const currentEditedItem = this.taskBeingEdited;
    if (!currentEditedItem) return;
    const item = this.getItemById(currentEditedItem.id);
    if (!item) return;
    item.title =
      currentEditedItem.title.length > 0 ? currentEditedItem.title : item.title; //if title is empty - return saved item
    item.description = currentEditedItem.description;
    item.timeAll = currentEditedItem.timeAll;
    item.timeSpent = currentEditedItem.timeSpent;
    item.timeRemain = currentEditedItem.timeRemain;
    this.taskBeingEdited = null;
    this._updateStorage();
  }

  removeItem(itemId: string) {
    const index = this.tasks.findIndex((t) => t.id === itemId);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
    this._updateStorage();
  }

  addNewItem() {
    const newTask = getNullTask();
    this.tasks.push(newTask);
    //new task is always in edit mode
    this.setItemAsBeingEdited(newTask.id);
    this._updateStorage();
  }

  cleanUpTasksList() {
    this.tasks = [];
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
