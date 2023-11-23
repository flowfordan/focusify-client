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
    const secondsAll = this.store.timer.stage.duration;
    const secondsPassed = this.store.timer.stage.timePassed;
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

  get currentCycle() {
    return this.store.timer.cycle;
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
