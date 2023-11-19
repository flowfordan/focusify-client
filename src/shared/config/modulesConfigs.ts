interface IConfigOption<T> {
  name: string;
  configurable: boolean;
  value: T;
  min?: number;
  max?: number;
}

export type TasksConfig = {
  maxTasks: IConfigOption<number>;
  isSoundOnComplete: IConfigOption<boolean>;
  autoDownCompleted: IConfigOption<boolean>;
  autoUpFocused: IConfigOption<boolean>;
  taskTitleMaxLen: IConfigOption<number>;
  taskDescrMaxLen: IConfigOption<number>;
};

/**
 * @description all values are in seconds
 */
export type TimerConfig = {
  pomodorosAmount: IConfigOption<number>;
  pomodoroDuration: IConfigOption<number>;
  sBreakDuration: IConfigOption<number>;
  lBreakDuration: IConfigOption<number>;
  isSoundOnComplete: IConfigOption<boolean>;
  isAutoStageStart: IConfigOption<boolean>;
};

export const DEFAULT_TASKS_CONF: TasksConfig = {
  maxTasks: {
    name: 'maxTasks',
    configurable: false,
    value: 10,
  },
  isSoundOnComplete: {
    name: 'isSoundOnComplete',
    configurable: true,
    value: true,
  },
  autoDownCompleted: {
    name: 'autoDownCompleted',
    configurable: true,
    value: true,
  },
  autoUpFocused: {
    name: 'autoUpFocused',
    configurable: true,
    value: true,
  },
  taskTitleMaxLen: {
    name: 'taskTitleMaxLen',
    configurable: true,
    value: 100,
  },
  taskDescrMaxLen: {
    name: 'taskDescrMaxLen',
    configurable: true,
    value: 300,
  },
};

export const DEFAULT_TIMER_CONF: TimerConfig = {
  pomodorosAmount: {
    name: 'pomodorosAmount',
    configurable: true,
    value: 4,
    min: 2,
    max: 8,
  },
  pomodoroDuration: {
    name: 'pomodoroDuration',
    configurable: true,
    value: 25 * 60,
    min: 10 * 60,
    max: 50 * 60,
  },
  sBreakDuration: {
    name: 'sBreakDuration',
    configurable: true,
    value: 5 * 60,
    min: 1 * 60,
    max: 10 * 60,
  },
  lBreakDuration: {
    name: 'lBreakDuration',
    configurable: true,
    value: 30 * 60,
    min: 5 * 60,
    max: 60 * 60,
  },
  isSoundOnComplete: {
    name: 'isSoundOnComplete',
    configurable: true,
    value: true,
  },
  isAutoStageStart: {
    name: 'isAutoStageStart',
    configurable: true,
    value: true,
  },
};

const timerStages = ['pomodoro', 'sBreak', 'lBreak'] as const;
export type TimerStageId = (typeof timerStages)[number];

export type TimerCycle = {
  scheme: Array<TimerStageId>;
  currentIdx: number;
};

export type TimerStage = {
  id: TimerStageId;
  duration: number;
  timePassed: number;
  status: 'active' | 'paused' | 'stopped';
};

export const NULL_TIMER_CYCLE: TimerCycle = {
  scheme: [],
  currentIdx: 0,
};
