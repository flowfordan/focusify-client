import { makeAutoObservable } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';

export class TasksStore implements ModuleStore {
  private _isActive: boolean;
  isAvailable: boolean;
  root: RootStore;
  constructor(root: RootStore) {
    this.root = root;
    this._isActive = true;
    this.isAvailable = true;

    makeAutoObservable(this);
  }

  set isActive(value: boolean) {
    this._isActive = value;
    this.root.countActiveModules();
  }

  get isActive() {
    return this._isActive;
  }

  toggleModuleActive() {
    this.isActive = !this.isActive;
  }
}
