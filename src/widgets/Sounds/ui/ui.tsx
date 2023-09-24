'use client';
import { Sound } from 'entities/Sound';
import { toJS } from 'mobx';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import { useSoundsModel } from 'shared/providers';

interface ISoundsWidgetProps {
  className?: string;
}

export const Sounds = ({ className }: ISoundsWidgetProps) => {
  //
  return (
    <div className={cn(className, styles.wrapper)}>
      Sounds widget
      {/* {items.map((i) => (
        <Sound key={i.name} soundData={i} />
      ))} */}
    </div>
  );
};
