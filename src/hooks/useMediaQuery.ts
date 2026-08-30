import { useSyncExternalStore } from 'react';

/** Subscribe to a CSS media query and re-render when its result changes. */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
  };
  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}