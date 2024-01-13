import { CardMain } from 'shared/ui';
import styles from './pageAbout.module.scss';
import Link from 'next/link';
import { AppVerBadge } from 'widgets/AppVerBadge';
import cn from 'classnames';

interface PageAboutProps {
  className?: string;
}

export const PageAbout = ({ className }: PageAboutProps) => {
  return (
    <div className={styles.container}>
      <CardMain className={styles.card} bgType="default" border>
        <div className={styles.cardContent}>
          <div className={styles.section}>
            <div className={styles.logoWrap}>
              <Link href={'/'}>
                <div className={styles.logo}>
                  <svg>
                    <title>FOCUSIFY logo</title>
                    <use href={'/icons/logo_full.svg#logo'} />
                  </svg>
                </div>
              </Link>
            </div>
            <div
              className={styles.title}
            >{`An online Pomodoro Timer and Task Manager to help you focus and boost your productivity`}</div>
          </div>
          <div className={styles.section}>
            <div className={styles.subtitle}>{`What is FOCUSIFY?`}</div>
            <div className={styles.txt}>
              <p>{`Supercharge your workday with our seamlessly integrated task manager and customizable Pomodoro timer. FOCUSIFY empowers you to stay focused, boost productivity, and achieve your goals like never before.`}</p>
              <br />
              <p>{`📋 Task Manager:
          Effortlessly organize your tasks, set priorities, and track progress in one intuitive interface. Link tasks to the Pomodoro timer for a dynamic workflow that keeps you in the zone.`}</p>
              <br />
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
          <div className={cn(styles.section, styles.footer)}>
            <div>
              {`Source code can be found on `}
              <a
                href={'https://github.com/flowfordan/focusify-client'}
                rel="external noreferrer"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                github
              </a>
            </div>
            <div>
              Made by{' '}
              <a
                href={'https://github.com/flowfordan'}
                rel="external noreferrer"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                flowfordan
              </a>
            </div>

            <AppVerBadge />
          </div>
        </div>
      </CardMain>
    </div>
  );
};
