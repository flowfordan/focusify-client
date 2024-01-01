interface IConfigOption<T> {
  name: string;
  displayName?: string;
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
  taskMaxPomodoros: IConfigOption<number>;
};

export type TaskConfigKey = keyof TasksConfig;

/**
 * @description all values are in seconds
 */
export type TimerConfig = {
  pomodorosAmount: IConfigOption<number>;
  pomodoroDuration: IConfigOption<number>;
  sBreakDuration: IConfigOption<number>;
  lBreakDuration: IConfigOption<number>;
  isAutoStageStart: IConfigOption<boolean>;
  playSounds: IConfigOption<boolean>;
};
export type TimerConfigKey = keyof TimerConfig;

export const DEFAULT_TASKS_CONF: TasksConfig = {
  maxTasks: {
    name: 'maxTasks',
    configurable: false,
    value: 10,
  },
  isSoundOnComplete: {
    name: 'isSoundOnComplete',
    displayName: 'Play sound on task complete',
    configurable: true,
    value: false,
  },
  autoDownCompleted: {
    name: 'autoDownCompleted',
    displayName: 'Move completed tasks to the bottom',
    configurable: true,
    value: false,
  },
  autoUpFocused: {
    name: 'autoUpFocused',
    displayName: 'Move focused tasks to the top',
    configurable: true,
    value: true,
  },
  taskTitleMaxLen: {
    name: 'taskTitleMaxLen',
    configurable: false,
    value: 100,
  },
  taskDescrMaxLen: {
    name: 'taskDescrMaxLen',
    configurable: false,
    value: 300,
  },
  taskMaxPomodoros: {
    name: 'taskMaxPomodoros',
    configurable: false,
    value: 10,
  },
};

//time in minutes:
const DEF_POMODORO_COUNT = 4; //4
const DEF_POMODORO_DUR = 0.5; //25
const DEF_SBREAK_DUR = 0.1; //5
const DEF_LBREAK_DUR = 0.1; //30
export const DEFAULT_TIMER_CONF: TimerConfig = {
  pomodorosAmount: {
    name: 'pomodorosAmount',
    configurable: true,
    value: DEF_POMODORO_COUNT,
    min: 2,
    max: 8,
    displayName: 'Pomodoros amount',
  },
  pomodoroDuration: {
    name: 'pomodoroDuration',
    configurable: true,
    value: DEF_POMODORO_DUR * 60,
    min: 10 * 60,
    max: 50 * 60,
    displayName: 'Pomodoro duration, sec',
  },
  sBreakDuration: {
    name: 'sBreakDuration',
    configurable: true,
    value: DEF_SBREAK_DUR * 60,
    min: 1 * 60,
    max: 10 * 60,
    displayName: 'Short Break duration, sec',
  },
  lBreakDuration: {
    name: 'lBreakDuration',
    configurable: true,
    value: DEF_LBREAK_DUR * 60,
    min: 5 * 60,
    max: 60 * 60,
    displayName: 'Long Break duration, sec',
  },
  isAutoStageStart: {
    name: 'isAutoStageStart',
    configurable: false,
    value: true,
    displayName: 'Autostart next stage',
  },
  playSounds: {
    name: 'playSounds',
    configurable: true,
    value: true,
    displayName: 'Play sounds',
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
