import { SessionStore } from './sessionStore';
import { UIStore } from './uiStore';
import { UserStore } from './userStore';

export class RootStore {
  user: UserStore;
  ui: UIStore;
  session: SessionStore;
  sounds: string;
  tasks: string;
  timer: string;
  constructor() {
    this.user = new UserStore();
    this.ui = new UIStore();
    this.session = new SessionStore();
    this.tasks = '';
    this.timer = '';
    this.sounds = '';
  }
}

export const rootStore = new RootStore();
