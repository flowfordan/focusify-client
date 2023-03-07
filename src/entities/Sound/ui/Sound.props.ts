import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { ISound } from "../config/types";

export interface SoundProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  soundData: ISound;
}
