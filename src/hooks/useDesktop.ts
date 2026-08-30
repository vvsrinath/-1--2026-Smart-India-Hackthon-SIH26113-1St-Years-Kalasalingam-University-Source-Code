import { useMemo } from 'react';
import { useMediaQuery } from './useMediaQuery';

export type DesktopOS = 'windows' | 'macos' | 'linux' | 'other';

export const DESKTOP_OS_LABELS: Record<DesktopOS, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  other: 'your device',
};

export function detectDesktopOS(userAgent: string = navigator.userAgent): DesktopOS {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows') || ua.includes('win32') || ua.includes('win64')) return 'windows';
  if (ua.includes('mac os') || ua.includes('macintosh') || ua.includes('iphone') || ua.includes('ipad')) return 'macos';
  if (
    ua.includes('linux') ||
    ua.includes('x11') ||
    ua.includes('ubuntu') ||
    ua.includes('debian') ||
    ua.includes('chrome os') ||
    ua.includes('cros')
  ) {
    return 'linux';
  }
  return 'other';
}

/** Detect whether the user is on a phone/tablet (touch) or a desktop computer (fine pointer + hover). */
export function useDesktop(): {
  isDesktop: boolean;
  isTouch: boolean;
  isTablet: boolean;
  os: DesktopOS;
} {
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const isCoarsePointer = useMediaQuery('(pointer: coarse)');
  // Tablets are coarse pointers with a wide viewport (e.g. 768px+).
  const isWide = useMediaQuery('(min-width: 768px)');
  const os = useMemo(() => detectDesktopOS(), []);
  const isDesktop = isFinePointer && !isCoarsePointer;
  return {
    isDesktop,
    isTouch: isCoarsePointer,
    isTablet: isCoarsePointer && isWide,
    os,
  };
}