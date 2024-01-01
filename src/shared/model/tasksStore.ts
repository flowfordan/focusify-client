/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';
import { ITask, ITaskEdited } from './types/task';
import {
  DEFAULT_TASKS_CONF,
  TaskConfigKey,
  TasksConfig,
  _mockTasks,
} from 'shared/config';
import { LOGGER, STORAGE } from 'shared/lib';

const getNullTitle = () => {
  const rand = Math.random();
  let word = 'that';
  switch (true) {
    case rand < 0.2:
      word = 'this';
      break;
    case rand < 0.5:
      word = 'the';
      break;
    case rand < 0.8:
      word = 'one';
      break;
    default:
      word = 'that';
  }

  return `Do ${word} thing`;
};

const getNullTask = (): ITask => {
  return {
    id: new Date().getTime().toString(),
    title: getNullTitle(),
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

type TasksStorageData = {
  isActive: boolean;
  tasks: Array<ITask>;
  config: TasksConfig;
  appVer: string;
};

const sounds = ['done', 'focused'] as const;
type SoundStage = (typeof sounds)[number];
export class TasksStore implements ModuleStore {
  STORAGE_MODULE_KEY: string;
  private _isActive: boolean;
  config: TasksConfig;
  isAvailable: boolean;
  root: RootStore;
  tasks: Array<ITask>;
  taskBeingEdited: ITaskEdited | null = null;
  soundEffects: {
    [K in SoundStage]: Howl | null;
  };
  constructor(root: RootStore) {
    this.STORAGE_MODULE_KEY = 'focusify_tasks';
    this.root = root;
    this._isActive = false;
    this.isAvailable = true;
    this.tasks = [];
    this.config = DEFAULT_TASKS_CONF;
    this.soundEffects = {
      done: null,
      focused: null,
    };

    makeAutoObservable(this);
  }

  init() {
    //load tasks and config from storage
    //rewrie default if saved smth
    this._loadDataFromStorage();
    this._loadSoundEffects();
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

  toggleModuleActive() {
    this.isActive = !this.isActive;
    //TODO if deactivated: cleanup all tasks
    this._updateStorage();
  }

  setItemFocused(itemId: string, isFocused?: boolean) {
    const item = this.getItemById(itemId);
    if (!item) return;
    if (isFocused !== undefined) item.isFocused = isFocused;
    else item.isFocused = !item.isFocused;

    if (item.isFocused) this._moveFocusedToTop();
    this._updateStorage();
  }

  toggleItemCompleted(itemId: string, status?: boolean) {
    const item = this.getItemById(itemId);
    if (!item) return;
    if (typeof status !== 'undefined') {
      item.isCompleted = status;
    } else {
      item.isCompleted = !item.isCompleted;
    }
    //complition
    if (item.isCompleted) {
      runInAction(() => {
        item.isFocused = false;
      });
      this._moveCompletedToBottom();
      this._playSoundEffect('done');
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

  setEditedItemPomodoros(total: number, passed: number) {
    if (!this.taskBeingEdited) return;
    this.taskBeingEdited.timeAll = total;
    this.taskBeingEdited.timeSpent = passed;
    this.taskBeingEdited.timeRemain = total - passed;
    //check if total = passed - then task is done
    if (total > 0 && total === passed)
      this.toggleItemCompleted(this.taskBeingEdited.id, true);
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

  setConfigOption(key: TaskConfigKey, value: number | boolean) {
    this.config[key].value = value;
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

  addPomodoroPassedToFocused() {
    const focused = this.currentFocusedTask;
    if (!focused) return;
    focused.timeSpent++;
    focused.timeRemain--;
    this._updateStorage();
  }

  savePersistantData() {
    this._updateStorage();
  }

  private _moveCompletedToBottom() {
    if (!this.config.autoDownCompleted.value) return;
    const completed = this.tasks.filter((t) => t.isCompleted);
    const notCompleted = this.tasks.filter((t) => !t.isCompleted);
    this.tasks = [...notCompleted, ...completed];
  }

  private _moveFocusedToTop() {
    if (!this.config.autoUpFocused.value) return;
    const focused = this.tasks.find((t) => t.isFocused);
    if (!focused) return;
    const notFocused = this.tasks.filter((t) => !t.isFocused);
    this.tasks = [focused, ...notFocused];
  }

  private _playSoundEffect(stage: SoundStage) {
    //check config
    if (!this.config.isSoundOnComplete.value) return;
    //check if sound is loaded
    const sound = this.soundEffects[stage];
    if (!sound) return;
    sound.play();
  }

  private _loadDataFromStorage() {
    const saved = STORAGE.get(this.STORAGE_MODULE_KEY);
    const savedAppVer = saved?.['appVer'];
    //validate app version
    if (saved && savedAppVer === this.root.appVer) {
      const tasksData = saved as TasksStorageData;
      this.config = tasksData.config;
      this.setTasks(tasksData.tasks);
      this.isActive = tasksData.isActive;
    } else {
      //delete key that may contain deprecated data
      STORAGE.remove(this.STORAGE_MODULE_KEY);
      //default is active
      this.isActive = true;
    }
  }

  private _updateStorage() {
    const data: TasksStorageData = {
      isActive: this.isActive,
      tasks: this.tasks,
      config: this.config,
      appVer: this.root.appVer,
    };
    STORAGE.set(this.STORAGE_MODULE_KEY, data);
  }

  private _loadSoundEffects() {
    runInAction(() => {
      this.soundEffects.focused = new Howl({
        src: ['/sounds/timer_lb_end.mp3'],
      });
      this.soundEffects.done = new Howl({
        src: ['/sounds/timer_lb_end.mp3'],
      });
    });
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
