import { PrimeReactContext } from 'primereact/api';
import { useContext } from 'react';

export function usePrimeUI() {
  const context = useContext(PrimeReactContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
}
