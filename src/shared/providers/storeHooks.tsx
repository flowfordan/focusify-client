'use client';
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

export function useSoundsStore() {
  const { modules } = useRootStore();
  return modules.sounds;
}

export function useTasksStore() {
  const { modules } = useRootStore();
  return modules.tasks;
}

export function useTimerStore() {
  const { modules } = useRootStore();
  return modules.timer;
}

export function useUIStore() {
  const { ui } = useRootStore();
  return ui;
}
