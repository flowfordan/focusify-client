import { ReactNode, createContext, useContext } from 'react';
import { IRootModel, RootStore } from 'shared/model';

export const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = 'StoreContext';

export function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
}

export function useSoundsModel() {
  const { sounds } = useRootStore();
  return sounds;
}

export function useTasksModel() {
  const { tasks } = useRootStore();
  return tasks;
}

export function useUIStore() {
  const { ui } = useRootStore();
  return ui;
}
