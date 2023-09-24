'use client';
import './sound.scss';
import { Btn } from 'shared/ui';
import { SoundProps } from './Sound.props';
// import { soundsModel } from '../model/soundsModel';
import { observer } from 'mobx-react-lite';

export const Sound = observer(({ soundData, ...props }: SoundProps) => {
  const { isPlaying, title, tag, curVolume, id } = soundData;

  // const toggleSound = () => {
  //   soundsModel.toggleSound(id);
  // };

  return (
    <div className="sound" {...props}>
      <span>{`ID: ${id}`}</span>
      <span>{title}</span>
      <span>{tag}</span>
      <span>{`Volume: ${curVolume}`}</span>
      {/* <Btn onClick={() => toggleSound()}>{isPlaying ? 'Pause' : 'Play'}</Btn> */}
    </div>
  );
});
