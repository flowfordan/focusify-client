import { makeAutoObservable } from 'mobx';

export class SoundsStore {
  isModuleAvailable: boolean;
  constructor() {
    this.isModuleAvailable = false;

    makeAutoObservable(this);
  }
}
