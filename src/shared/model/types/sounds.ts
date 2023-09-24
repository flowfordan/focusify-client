export interface ISound {
  id: string;
  name: string;
  title: string;
  isPlaying: boolean;
  curVolume: number;
  tag: string;
  audio: HTMLAudioElement | null;
}

export interface ISoundsModel {
  sounds: Array<ISound>;
  _getSound: (soundId: string) => void;
  toggleSound: (soundId: string) => void;
}
