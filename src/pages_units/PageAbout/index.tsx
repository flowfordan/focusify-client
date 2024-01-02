import { CardMain } from 'shared/ui';
import styles from './pageAbout.module.scss';

interface PageAboutProps {
  className?: string;
}

export const PageAbout = ({ className }: PageAboutProps) => {
  return (
    <div className={styles.container}>
      <CardMain className={styles.card} bgType="default" border>
        <div className={styles.cardContent}>
          <div className={styles.section}>
            <div>FOcusify logo</div>
            <div
              className={styles.title}
            >{`An online Pomodoro Timer and Task Manager to help you focus and boost your productivity`}</div>
          </div>
          <div className={styles.section}>
            <div className={styles.subtitle}>{`What is FOCUSIFY?`}</div>
            <div className={styles.txt}>
              <p>{`Supercharge your workday with our seamlessly integrated task manager and customizable Pomodoro timer. FOCUSIFY empowers you to stay focused, boost productivity, and achieve your goals like never before.`}</p>
              <p>{`📋 Task Manager:
          Effortlessly organize your tasks, set priorities, and track progress in one intuitive interface. Link tasks to the Pomodoro timer for a dynamic workflow that keeps you in the zone.`}</p>
              <p>{`⏲️ Customizable Pomodoro Timer:
          Take control of your work sessions with a Pomodoro timer that suits your unique preferences. Customize timer durations, break intervals, and more to match your optimal productivity rhythm.`}</p>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.subtitle}>{`How to use it?`}</div>
            <div className={styles.txt}>
              {`You can use Timer and Tasks separately or you can connect any task with the Timer. 
          Any focused Task is automatically connected with Timer's cycle. To mark Task as focused just press 'bolt' icon
          on the left side of a task, than you can set up 'pomodoros' count needed for this Task to be completed`}
            </div>
          </div>
          <div className={styles.section}>
            <div>
              {`Source code can be found on `}
              <a href={'https://github.com/flowfordan/focusify-client'}>
                github
              </a>
            </div>
            <div>
              Made by <a href={'https://github.com/flowfordan'}>flowfordan</a>
            </div>
          </div>
        </div>
      </CardMain>
    </div>
  );
};