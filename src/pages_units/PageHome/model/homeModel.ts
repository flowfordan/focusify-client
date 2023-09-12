import { makeAutoObservable } from 'mobx';
import { IWidget, widgetsDefault } from '../config';

class HomeModel {
  widgets: Array<IWidget>;
  constructor() {
    this.widgets = widgetsDefault;
    makeAutoObservable(this);
  }
}

export const homeModel = new HomeModel();
