import { SessionStore } from './sessionStore';
import { SoundsStore } from './soundsStore';
import { TasksStore } from './tasksStore';
import { TimerStore } from './timerStore';
import { UIStore } from './uiStore';
import { UserStore } from './userStore';

export class RootStore {
  user: UserStore;
  ui: UIStore;
  session: SessionStore;
  modules: {
    tasks: TasksStore;
    timer: TimerStore;
    sounds: SoundsStore;
  };
  constructor() {
    this.user = new UserStore();
    this.ui = new UIStore();
    this.session = new SessionStore();
    this.modules = {
      tasks: new TasksStore(),
      timer: new TimerStore(),
      sounds: new SoundsStore(),
    };
  }
}

export const rootStore = new RootStore();
