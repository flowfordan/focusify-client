interface IConfigOption<T> {
  name: string;
  configurable: boolean;
  value: T;
}

export type TasksConfig = {
  maxTasks: IConfigOption<number>;
  isSoundOnComplete: IConfigOption<boolean>;
  autoDownCompleted: IConfigOption<boolean>;
  autoUpFocused: IConfigOption<boolean>;
  taskTitleMaxLen: IConfigOption<number>;
  taskDescrMaxLen: IConfigOption<number>;
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
