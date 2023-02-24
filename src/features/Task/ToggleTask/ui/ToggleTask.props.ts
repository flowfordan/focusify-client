import { InputHTMLAttributes, DetailedHTMLProps} from 'react';

export interface ToggleTaskProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  taskId: string;
}