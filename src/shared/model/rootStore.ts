import { reaction } from 'mobx';
import { SessionStore } from './sessionStore';
import { SoundsStore } from './soundsStore';
import { TasksStore } from './tasksStore';
import { TimerStore } from './timerStore';
import { UIStore } from './uiStore';
import { UserStore } from './userStore';
import { ModuleId } from 'shared/config';
import { STORAGE } from 'shared/lib';
import appData from '../../../package.json';

type Store<T> = T extends 'tasks'
  ? TasksStore
  : T extends 'timer'
  ? TimerStore
  : T extends 'sounds'
  ? SoundsStore
  : never;

type Modules = {
  [K in ModuleId]: Store<K>;
};

const STORAGE_MODULES_KEY = 'focusify_modules';

export class RootStore {
  user: UserStore;
  ui: UIStore;
  session: SessionStore;
  modules: Modules;
  modulesStats: {
    activeCount: number;
  };
  appVer: string;
  constructor() {
    this.user = new UserStore();
    this.ui = new UIStore();
    this.session = new SessionStore();
    this.modules = {
      tasks: new TasksStore(this),
      timer: new TimerStore(this),
      sounds: new SoundsStore(this),
    };
    this.modulesStats = {
      activeCount: 0,
    };
    this.appVer = appData.version;
    this.init();
  }

  init() {
    //load data from LS
    // this.subscribeToChanges();
    Object.keys(this.modules).forEach((key) => {
      const module = this.modules[key as keyof typeof this.modules];
      module.init();
    });
    // this.loadModuleDataFromStorage();
    this.countActiveModules();
  }

  onModuleToggleActive() {
    this.countActiveModules();
    // this.saveModuleDataToStorage();
  }

  onTimerPomodororStageEnd() {
    this.modules.tasks.addPomodoroPassedToFocused();
  }

  private countActiveModules() {
    let count = 0;
    for (const key in this.modules) {
      if (this.modules[key as keyof typeof this.modules].isActive) {
        count++;
      }
    }
    this.modulesStats.activeCount = count;
  }
}

export const rootStore = new RootStore();
