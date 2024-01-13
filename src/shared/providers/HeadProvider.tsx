'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useTasksStore, useTimerStore } from '.';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

export const HeadProvider = observer(() => {
  const path = usePathname();
  const tasks = useTasksStore();
  const timer = useTimerStore();
  const focused = tasks.tasks.find((t) => t.isFocused);
  const isTimerGoing = timer.timer.stage.status;
  const timeLeft = timer.timeLeftFormatted;
  const timerStage = timer.timer.stage.id;
  //FOCUSIFY | timer | task
  useEffect(() => {
    let taskPt = '';
    let timerPtTime = '';
    let timerPtStage = '';
    if (focused) {
      taskPt = ` | ${focused.title}`;
    }
    if (isTimerGoing !== 'stopped') {
      timerPtTime = ` - ${timeLeft}`;
      timerPtStage = ` | ${timerStage}`;
    }
    document.title = `FOCUSIFY${timerPtStage}${timerPtTime}${taskPt}`;
  }, [focused, timeLeft, timerStage]);
  return <></>;
});
