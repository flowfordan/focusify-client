import { makeAutoObservable } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';

export class SoundsStore implements ModuleStore {
  STORAGE_MODULE_KEY: string;
  private _isActive: boolean;
  isAvailable: boolean;
  root: RootStore;
  constructor(root: RootStore) {
    this.STORAGE_MODULE_KEY = 'focusify_sounds';
    this.root = root;
    this._isActive = false;
    this.isAvailable = true;

    makeAutoObservable(this);
  }

  init() {
    //
  }

  set isActive(value: boolean) {
    this._isActive = value;
    //this.root.onModuleToggleActive();
  }

  get isActive() {
    return this._isActive;
  }

  toggleModuleActive() {
    this.isActive = !this.isActive;
  }

  subscribeToChanges(): void {
    //
  }
}
