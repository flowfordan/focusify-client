import { makeAutoObservable, runInAction } from 'mobx';
import { ModuleStore } from './_moduleStore';
import { RootStore } from './rootStore';
import {
  DEFAULT_TIMER_CONF,
  NULL_TIMER_CYCLE,
  TimerConfig,
  TimerConfigKey,
  TimerCycle,
  TimerStage,
  TimerStageId,
} from 'shared/config';
import { STORAGE } from 'shared/lib';
import { Howl, Howler } from 'howler';

type TimerStorageData = {
  isActive: boolean;
  config: TimerConfig;
  appVer: string;
};

export class TimerStore implements ModuleStore {
  private timerExecutor: Worker | null;
  STORAGE_MODULE_KEY: string;
  private _isActive: boolean;
  isAvailable: boolean;
  root: RootStore;
  timer: {
    cycle: TimerCycle;
    stage: TimerStage;
  };
  soundEffects: {
    [K in TimerStageId]: Howl | null;
  };
  //current stage: pomodoro, lBreak or sBreak
  //stage status
  config: TimerConfig;
  constructor(root: RootStore) {
    this.timerExecutor = null;
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
    this.soundEffects = {
      pomodoro: null,
      lBreak: null,
      sBreak: null,
    };
    this.config = DEFAULT_TIMER_CONF;

    makeAutoObservable(this);
  }

  init() {
    //TODO load config from LS
    this._loadDataFromStorage();
    //apply config
    this.updCycleFromConfig();
    this.updTimerStage();
    this._initWorker();
    this._loadSoundEffects();
  }

  set isActive(value: boolean) {
    this._isActive = value;
    //reset timer
    this.stopTimerStage();
    this._updateStorage();
  }

  get isActive() {
    return this._isActive;
  }

  get timeLeftFormatted() {
    const secondsAll = this.timer.stage.duration;
    const secondsPassed = this.timer.stage.timePassed;
    const secondsLeft = secondsAll - secondsPassed;
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = Math.floor(secondsLeft % 60);
    //
    const hoursStr = hours > 0 ? (hours > 9 ? `${hours}` : `0${hours}`) : '';
    const minutesStr =
      minutes > 0 ? (minutes > 9 ? `${minutes}` : `0${minutes}`) : '00';
    const secondsStr =
      seconds > 0 ? (seconds > 9 ? `${seconds}` : `0${seconds}`) : '00';

    return `${hoursStr}${hoursStr ? ':' : ''}${minutesStr}:${secondsStr}`;
  }

  private _addSecond() {
    this.timer.stage.timePassed++;
  }

  private _initWorker() {
    if (typeof Worker === 'undefined') {
      //can set error state - timer is not supported
      if (typeof window !== 'undefined') {
        console.error('Timer is not supported');
      }
      return;
    }
    //INIT WORKER
    this.timerExecutor = new Worker(
      new URL('../workers/timerWorker.ts', import.meta.url)
    );
    //check messages
    if (this.timerExecutor) {
      this.timerExecutor.onmessage = (e: MessageEvent<string>) => {
        const data = e.data;
        switch (data) {
          case 'tok':
            if (this.timer.stage.status !== 'active') return;
            this._addSecond();
            this._timerStageTick();
            break;
          default:
            console.error('Unknown command from timer worker');
        }
      };
    }
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
    this.timer.stage.status = 'active';
    this._timerStageTick();
  }

  pauseTimerStage() {
    this._abortCurrentTick();
    this.timer.stage.status = 'paused';
  }

  stopTimerStage() {
    this._abortCurrentTick();
    this.timer.stage.status = 'stopped';
    this.timer.stage.timePassed = 0;
  }

  setConfigOption(key: TimerConfigKey, value: number | boolean) {
    this.config[key].value = value;
  }

  savePersistantData() {
    this._updateStorage();
    this.init();
  }

  private _timerStageTick() {
    if (this.timer.stage.status !== 'active') return;
    if (this.timer.stage.timePassed >= this.timer.stage.duration) {
      if (this.timer.stage.id === 'pomodoro') this._onPomodoroStageEnd();
      //play stage end sound
      this._playStageEndSound(this.timer.stage.id);
      //set next stage (and start timer if auto start enabled)
      this.moveToNextStage();
    } else {
      if (this.timerExecutor) this.timerExecutor.postMessage('tick');
    }
  }

  private _abortCurrentTick() {
    if (this.timerExecutor) this.timerExecutor.postMessage('abort');
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

  /**
   * update focused task with +1 passed pomodoro
   */
  private _onPomodoroStageEnd() {
    this.root.onTimerPomodororStageEnd();
  }

  private _playStageEndSound(stage: TimerStageId) {
    if (!this.config.playSounds.value) return;
    const sound = this.soundEffects[stage];
    // Play the sound.
    if (sound) sound.play();
  }

  private _loadSoundEffects() {
    runInAction(() => {
      this.soundEffects.pomodoro = new Howl({
        src: ['/sounds/timer_pd_end.mp3'],
      });
      this.soundEffects.sBreak = new Howl({
        src: ['/sounds/timer_sb_end.mp3'],
      });
      this.soundEffects.lBreak = new Howl({
        src: ['/sounds/timer_lb_end.mp3'],
      });
    });
  }

  private _loadDataFromStorage() {
    const saved = STORAGE.get(this.STORAGE_MODULE_KEY);
    const savedAppVer = saved?.['appVer'];
    if (saved && savedAppVer === this.root.appVer) {
      const timerData = saved as TimerStorageData;
      if ('config' in timerData) this.config = timerData.config;
      if ('isActive' in timerData) this.isActive = timerData.isActive;
    } else {
      STORAGE.remove(this.STORAGE_MODULE_KEY);
      //default is not-active
      this.isActive = false;
    }
  }

  private _updateStorage() {
    const data: TimerStorageData = {
      isActive: this.isActive,
      config: this.config,
      appVer: this.root.appVer,
    };
    STORAGE.set(this.STORAGE_MODULE_KEY, data);
  }

  private _resetTimer() {}
}
