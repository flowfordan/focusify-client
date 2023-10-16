import { makeAutoObservable } from 'mobx';

export class TasksStore {
  isModuleAvailable: boolean;
  constructor() {
    this.isModuleAvailable = true;

    makeAutoObservable(this);
  }
}
