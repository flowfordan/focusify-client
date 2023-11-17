import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { ISound } from 'shared/model';

export interface SoundProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  soundData: ISound;
}
