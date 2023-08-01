import { makeAutoObservable } from "mobx";
import { apiClient } from "shared";
import { DefSounds } from "../config/sounds";
import { ISound } from "../config/types";

class SoundsModel {
  sounds: Array<ISound>;
  constructor() {
    //init sounds default
    this.sounds = DefSounds;

    makeAutoObservable(this);
  }

  _getSound = (soundId: string) => {
    const sound = this.sounds.find((s) => (s.id = soundId));
  };

  toggleSound = (soundId: string) => {
    const sound = this.sounds.find((s) => s.id === soundId);
    if (!sound) return;

    sound.isPlaying = !sound.isPlaying;

    //set as loading
    //check if have file
    // apiClient.getSound(soundId)

    //if not - download
    if (!sound.audio) {
      console.log("no audio:", soundId);
      const url = "";
      sound.audio = new Audio(
        `https://cdn.noises.online/NoisesOnline/Audio/${soundId}.ogg`
      );

      // apiClient.getSound(soundId);
    }

    if (!sound.isPlaying) {
      sound.audio.pause();
    } else {
      sound.audio.play();
    }
  };
}

export const soundsModel = new SoundsModel();
