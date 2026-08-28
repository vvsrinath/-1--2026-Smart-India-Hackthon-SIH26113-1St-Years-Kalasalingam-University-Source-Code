import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll position when the route changes. */
export function useScrollToTop(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
}