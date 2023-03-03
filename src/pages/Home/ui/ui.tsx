import { Tasks } from "widgets/Tasks";
import { Sounds } from "widgets/Sounds";
import './ui.scss';

export const Home = () => {
  //header
  //widget Sounds
  //widget Timer
  //widget Tasks
  //widget Footer
  return(
    <div className='homePage'>
      <Sounds />
      <Tasks />
    </div>
  )
}