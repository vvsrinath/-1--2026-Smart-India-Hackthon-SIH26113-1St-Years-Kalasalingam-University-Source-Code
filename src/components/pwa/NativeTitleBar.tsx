import { useWindowControlsOverlay } from '../../hooks/useWindowControlsOverlay';
import { DESKTOP_OS_LABELS, detectDesktopOS } from '../../hooks/useDesktop';

/**
 * Native-app title bar for installed desktop PWAs running in Window Controls
 * Overlay. The browser draws the real minimize/maximize/close buttons in the
 * reserved corner; this bar fills the remaining titlebar area with the brand
 * and a drag region so the window can be moved like a desktop app.
 */
export function NativeTitleBar() {
  const { active } = useWindowControlsOverlay();
  if (!active) return null;

  const os = detectDesktopOS();

  return (
    <div className="ss-native-titlebar" role="banner" aria-label="Application window title bar">
      <div className="ss-native-titlebar-inner">
        <img src="/logo.png" alt="" className="h-4 w-4 object-contain ss-native-no-drag" />
        <span className="truncate text-xs font-medium text-navy">Swasthya Sathi</span>
        <span className="ml-auto shrink-0 rounded-full border border-line bg-line-soft/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-ink-500 ss-native-no-drag">
          Desktop · {DESKTOP_OS_LABELS[os]}
        </span>
      </div>
    </div>
  );
}