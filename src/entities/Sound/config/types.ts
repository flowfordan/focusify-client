export interface ISound {
  id: string;
  name: string;
  title: string;
  isPlaying: boolean;
  curVolume: number;
  tag: string;
  audio: HTMLAudioElement | null;
}
