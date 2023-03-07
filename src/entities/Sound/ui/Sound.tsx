import './sound.scss';
import { Btn } from 'shared/ui';

export const Sound = () => {
  return(
    <div className='sound'>
      <span>picture</span>
      <span>Tag?</span>
      <span>volume control</span>
      <span><Btn onClick={() => console.log('btn click')}>Play/Pause</Btn></span>
    </div>
  )
}
