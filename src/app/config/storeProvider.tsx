'use client';
import { StoreContext } from 'shared';
import { appModel } from '../model';

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={appModel}>{children}</StoreContext.Provider>
  );
}
