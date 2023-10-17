const modules = ['tasks', 'timer', 'sounds'] as const;
export type ModuleId = (typeof modules)[number];
export interface IModuleData {
  id: ModuleId;
  name: string;
}
export const modulesData: Array<IModuleData> = [
  {
    id: 'sounds',
    name: 'Sounds',
  },
  {
    id: 'tasks',
    name: 'Tasks',
  },
  {
    id: 'timer',
    name: 'Timer',
  },
];
