import { makeAutoObservable } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';
import {
  DEFAULT_TIMER_CONF,
  NULL_TIMER_CYCLE,
  TimerConfig,
  TimerCycle,
  TimerStage,
  TimerStageId,
} from 'shared/config';
import { STORAGE } from 'shared/lib';

type TimerStorageData = {
  isActive: boolean;
  timer: null;
  config: TimerConfig;
};

export class TimerStore implements ModuleStore {
  STORAGE_MODULE_KEY: string;
  private _isActive: boolean;
  isAvailable: boolean;
  root: RootStore;
  timer: {
    cycle: TimerCycle;
    stage: TimerStage;
  };
  //current stage: pomodoro, lBreak or sBreak
  //stage status
  config: TimerConfig;
  constructor(root: RootStore) {
    this.STORAGE_MODULE_KEY = 'focusify_timer';
    this.root = root;
    this._isActive = false;
    this.isAvailable = true;
    this.timer = {
      cycle: NULL_TIMER_CYCLE,
      stage: {
        id: 'pomodoro',
        duration: 0,
        timePassed: 0,
        status: 'stopped',
      },
    };
    this.config = DEFAULT_TIMER_CONF;

    makeAutoObservable(this);
  }

  init() {
    //TODO load config from LS
    //apply config
    this.updCycleFromConfig();
    this.updTimerStage();
    //check saved timer
  }

  set isActive(value: boolean) {
    this._isActive = value;
    //this.root.onModuleToggleActive();
  }

  get isActive() {
    return this._isActive;
  }

  calculateTimeLeftPercent() {
    const secondsAll = this.timer.stage.duration;
    const secondsPassed = this.timer.stage.timePassed;
    const secondsLeft = secondsAll - secondsPassed;
    const percent = Math.floor((secondsLeft / secondsAll) * 100);
    if (percent < 0) return 0;
    if (percent > 100) return 100;
    return percent;
  }

  updCycleFromConfig() {
    const pomodoroCount = this.config.pomodorosAmount.value;
    //construct scheme 1p then 1sb
    const scheme: Array<TimerStageId> = [];
    for (let i = 0; i < pomodoroCount; i++) {
      scheme.push('pomodoro');
      if (i < pomodoroCount - 1) scheme.push('sBreak');
    }
    //append 1 long break at the end
    scheme.push('lBreak');
    this.timer.cycle.scheme = scheme;
    this.timer.cycle.currentIdx = 0;
  }

  updTimerStage() {
    const curId = this.timer.cycle.scheme[this.timer.cycle.currentIdx];
    let durationStage = 0;
    switch (curId) {
      case 'pomodoro':
        durationStage = this.config.pomodoroDuration.value;
        break;
      case 'sBreak':
        durationStage = this.config.sBreakDuration.value;
        break;
      case 'lBreak':
        durationStage = this.config.lBreakDuration.value;
        break;
      default:
        throw new Error('Unknown timer stage id');
    }
    this.timer.stage = {
      id: curId,
      status: 'stopped',
      timePassed: 0,
      duration: durationStage,
    };
  }

  startTimerStage() {
    //change status
    //start timer
    this.timer.stage.status = 'active';
    this._timerStageTick();
  }

  pauseTimerStage() {
    this.timer.stage.status = 'paused';
  }

  stopTimerStage() {
    this.timer.stage.status = 'stopped';
    this.timer.stage.timePassed = 0;
  }

  private _timerStageTick() {
    if (this.timer.stage.status !== 'active') return;
    if (this.timer.stage.timePassed >= this.timer.stage.duration) {
      // this.stopTimerStage();
      // this._timerCycleNext();
      //set next stage (and start timer if auto start enabled)
      this.moveToNextStage();
    } else {
      this.timer.stage.timePassed++;
      setTimeout(() => this._timerStageTick(), 1000);
    }
  }

  moveToNextStage() {
    const len = this.timer.cycle.scheme.length;
    //if last stage - reset cycle
    if (this.timer.cycle.currentIdx === len - 1) {
      //reset
      this.timer.cycle.currentIdx = 0;
    } else {
      this.timer.cycle.currentIdx++;
    }
    this.updTimerStage();
  }

  toggleModuleActive() {
    this.isActive = !this.isActive;
    this._updateStorage();
  }

  subscribeToChanges(): void {
    //
  }

  private _updateStorage() {
    STORAGE.set(this.STORAGE_MODULE_KEY, {
      isActive: this.isActive,
      timer: null,
    });
  }
}
