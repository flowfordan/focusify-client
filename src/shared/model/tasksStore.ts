/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';
import { ITask, ITaskEdited } from './types/task';
import { DEFAULT_TASKS_CONF, TasksConfig, _mockTasks } from 'shared/config';
import { LOGGER, STORAGE } from 'shared/lib';

const getNullTask = (): ITask => {
  const rand = Math.random();
  return {
    id: new Date().getTime().toString(),
    title: rand > 0.5 ? 'Do this thing' : 'Do that thing',
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

const STORAGE_TASKS_KEY = 'focusify_tasks';

type TasksStorageData = {
  isActive: boolean;
  tasks: Array<ITask>;
  config: TasksConfig;
};
export class TasksStore implements ModuleStore {
  private _isActive: boolean;
  config: TasksConfig;
  isAvailable: boolean;
  root: RootStore;
  tasks: Array<ITask>;
  taskBeingEdited: ITaskEdited | null = null;
  constructor(root: RootStore) {
    this.root = root;
    this._isActive = false;
    this.isAvailable = true;
    this.tasks = [];
    this.config = DEFAULT_TASKS_CONF;

    makeAutoObservable(this);
  }

  init() {
    //load tasks and config from storage
    //rewrie default if saved smth
    this._loadDataFromStorage();
  }

  set isActive(value: boolean) {
    this._isActive = value;
    LOGGER.debug('misc', `tasks length on SET ACTIVE ${this.tasks.length}`);
    this._updateStorage();
    //this.root.onModuleToggleActive();
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

  get currentFocusedTask() {
    return this.tasks.find((t) => t.isFocused);
  }

  getItemById(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  private _loadDataFromStorage() {
    const saved = STORAGE.get(STORAGE_TASKS_KEY);
    if (saved) {
      const tasksData = saved as TasksStorageData;
      this.config = tasksData.config;
      this.setTasks(tasksData.tasks);
      this.isActive = tasksData.isActive;
    } else {
      //default is active
      this.isActive = true;
    }
  }

  private _updateStorage() {
    LOGGER.debug('misc', `tasks update storage ${this.tasks.length}`);
    const data: TasksStorageData = {
      isActive: this.isActive,
      tasks: this.tasks,
      config: this.config,
    };
    STORAGE.set(STORAGE_TASKS_KEY, data);
  }

  toggleModuleActive() {
    this.isActive = !this.isActive;
    //TODO if deactivated: cleanup all tasks
    this._updateStorage();
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
    if (this.tasksCount >= this.config.maxTasks.value) return;
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

  setTasks(tasks: Array<ITask>) {
    this.tasks = tasks;
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
