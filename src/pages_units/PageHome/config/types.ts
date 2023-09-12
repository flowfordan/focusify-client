export const widgets = ['sounds', 'tasks', 'timer'] as const;
export type ModuleName = (typeof widgets)[number];

export interface IModule<T extends ModuleName> {
  name: T;
  isEnabled: boolean;
}

export type ModulesData = {
  [key in ModuleName]: IModule<key>;
};
