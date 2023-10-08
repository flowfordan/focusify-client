'use client';
import { PrimeReactContext, PrimeReactProvider } from 'primereact/api';

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrimeReactProvider>
      <PrimeReactContext.Consumer>
        {(primeReact) => {
          primeReact.ripple = true;
          return children;
        }}
      </PrimeReactContext.Consumer>
    </PrimeReactProvider>
  );
};
