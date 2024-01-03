'use client';
// import { Sound, soundsModel } from 'entities/Sound';
import { toJS } from 'mobx';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';

interface ISoundsWidgetProps {
  className?: string;
}

export const SoundsCompact = ({ className }: ISoundsWidgetProps) => {
  // const items = soundsModel.sounds;
  return (
    <div className={cn(className, styles.wrapper)}>
      Sounds Compact
      {/* {items.map((i) => (
        <Sound key={i.name} soundData={i} />
      ))} */}
    </div>
  );
};
