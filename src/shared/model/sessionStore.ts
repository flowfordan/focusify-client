import { makeAutoObservable } from 'mobx';

export class SessionStore {
  public createdAt: Date | null;
  public token: string | null;
  public userId: string | null;
  constructor() {
    this.createdAt = null;
    this.token = null;
    this.userId = null;
    makeAutoObservable(this);
  }

  reset() {
    this.createdAt = null;
    this.token = null;
    this.userId = null;
  }
}
