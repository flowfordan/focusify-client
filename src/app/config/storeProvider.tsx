'use client';
import { StoreContext } from 'shared';
import { rootStore } from 'shared/model';

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
}
