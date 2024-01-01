import { TimerConfigKey } from 'shared/config';
import { LOGGER } from 'shared/lib';
import { rootStore } from 'shared/model';
import type { TimerStore } from 'shared/model';

class TimerModel {
  constructor(public store: TimerStore) {
    //
  }

  get isPlaying() {
    return this.store.timer.stage.status === 'active';
  }

  get timeLeft() {
    return this.store.timeLeftFormatted;
  }

  get currentCycle() {
    return this.store.timer.cycle;
  }

  get timerPercentLeft() {
    const secondsAll = this.store.timer.stage.duration;
    const secondsPassed = this.store.timer.stage.timePassed;
    const secondsLeft = secondsAll - secondsPassed;
    const percent = Math.floor((secondsLeft / secondsAll) * 100);
    if (percent < 0) return 0;
    if (percent > 100) return 100;
    return percent;
  }

  get config() {
    return this.store.config;
  }

  updateConfigOption(key: TimerConfigKey, value: number | boolean) {
    this.store.setConfigOption(key, value);
  }

  save() {
    this.store.savePersistantData();
  }

  togglePlay() {
    if (!this.isPlaying) this.store.startTimerStage();
    else this.store.pauseTimerStage();
  }

  forward() {
    this.store.moveToNextStage();
  }

  //stop - reset current stage to 0
  stop() {
    this.store.stopTimerStage();
  }

  //back to stage 0
  refresh() {}
}

export const timerModel = new TimerModel(rootStore.modules.timer);
