'use client';
import { Sound } from 'entities/Sound';
import { toJS } from 'mobx';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import styles from './ui.module.scss';
import { Card } from 'primereact/card';
import { CardMain } from 'shared/ui';

interface ISoundsWidgetProps {
  className?: string;
}

export const Sounds = ({ className }: ISoundsWidgetProps) => {
  //
  return (
    <div>
      Sounds widget
      {/* {items.map((i) => (
        <Sound key={i.name} soundData={i} />
      ))} */}
    </div>
  );
};
