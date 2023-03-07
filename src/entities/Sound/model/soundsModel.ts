import { makeAutoObservable } from 'mobx';
import { DefSounds } from "../config/sounds";
import { ISound } from "../config/types";

class SoundsModel {
  sounds: Array<ISound>;
  constructor(){
    //init sounds default
    this.sounds = DefSounds;

    makeAutoObservable(this);
  }

  getSound = (soundId: string) => {
    const sound = this.sounds.find(s => s.id = soundId);
  }

  toggleSound = (soundId: string) => {
    const sound = this.sounds.find(s => s.id = soundId);
    if(!sound) return;

    sound.isPlaying = !sound.isPlaying;
  }

}

export const soundsModel = new SoundsModel();