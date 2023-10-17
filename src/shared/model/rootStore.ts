import { reaction } from 'mobx';
import { SessionStore } from './sessionStore';
import { SoundsStore } from './soundsStore';
import { TasksStore } from './tasksStore';
import { TimerStore } from './timerStore';
import { UIStore } from './uiStore';
import { UserStore } from './userStore';
import { ModuleId } from 'shared/config';

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

export class RootStore {
  user: UserStore;
  ui: UIStore;
  session: SessionStore;
  modules: Modules;
  modulesStats: {
    activeCount: number;
  };
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
    this.init();
  }

  init() {
    this.countActiveModules();
  }

  countActiveModules() {
    let count = 0;
    for (const key in this.modules) {
      if (this.modules[key as keyof typeof this.modules].isActive) {
        count++;
      }
    }
    this.modulesStats.activeCount = count;
  }
  // subscribeToChanges() {
  //   reaction(() => {
  //     return this.modules.sounds.isActive
  //   }, () => {})
  // }
}

export const rootStore = new RootStore();
