import { makeAutoObservable } from 'mobx';

export class TimerStore {
  isModuleAvailable: boolean;
  constructor() {
    this.isModuleAvailable = false;

    makeAutoObservable(this);
  }
}
