import { useEffect, useState } from 'react';

interface WindowControlsOverlay extends EventTarget {
  visible: boolean;
  getTitlebarAreaRect: () => DOMRect;
}

type NavWithWCO = Navigator & { windowControlsOverlay?: WindowControlsOverlay };

function getWCO(): WindowControlsOverlay | null {
  return (navigator as NavWithWCO).windowControlsOverlay ?? null;
}

/**
 * Tracks the Window Controls Overlay for installed desktop PWAs.
 * When active, Chromium draws the native minimize/maximize/close buttons in
 * the titlebar region and the app can draw its own draggable title bar using
 * the `env(titlebar-area-*)` CSS variables.
 */
export function useWindowControlsOverlay(): { active: boolean } {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const wco = getWCO();
    setActive(Boolean(wco?.visible));
    if (!wco) return;

    const update = () => setActive(wco.visible);
    wco.addEventListener('geometrychange', update);
    return () => wco.removeEventListener('geometrychange', update);
  }, []);

  return { active };
}