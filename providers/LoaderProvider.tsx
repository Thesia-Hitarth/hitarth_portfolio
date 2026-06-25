/**
 * providers/LoaderProvider.tsx
 * Tracks whether the page loader has completed.
 * All sections and GSAP scroll triggers wait for isLoaded = true.
 */

'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface LoaderContextValue {
  isLoaded: boolean;
  setIsLoaded: (v: boolean) => void;
}

const LoaderContext = createContext<LoaderContextValue>({
  isLoaded: false,
  setIsLoaded: () => {},
});

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
