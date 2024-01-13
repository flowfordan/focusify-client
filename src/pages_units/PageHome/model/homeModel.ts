import { makeAutoObservable } from 'mobx';
import {
  IModule,
  ModuleName,
  ModulesData,
  modulesDefaultData,
} from '../config';

class HomeModel {
  modules: ModulesData;
  constructor() {
    this.modules = modulesDefaultData;
    makeAutoObservable(this);
  }

  get enabledModulesCount() {
    let count = 0;
    Object.keys(this.modules).forEach((key) => {
      if (this.modules[key as ModuleName].isEnabled) count++;
    });
    return count;
  }

  toggleWidgetEnabled = (moduleName: ModuleName) => {
    this.modules[moduleName].isEnabled = !this.modules[moduleName].isEnabled;
  };

  isModuleEnabled = (moduleName: ModuleName) => {
    if (this.modules[moduleName].isEnabled) return true;
    else return false;
  };
}

export const homeModel = new HomeModel();
