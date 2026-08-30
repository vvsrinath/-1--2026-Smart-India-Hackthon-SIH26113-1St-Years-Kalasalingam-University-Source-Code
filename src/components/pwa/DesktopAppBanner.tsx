import React from 'react';
import {
  DownloadIcon,
  LaptopIcon,
  MonitorDownIcon,
  MonitorCogIcon,
  XIcon,
} from 'lucide-react';
import { Button } from '../common/Button';
import { DESKTOP_OS_LABELS, type DesktopOS } from '../../hooks/useDesktop';

interface DesktopAppBannerProps {
  os: DesktopOS;
  canInstall: boolean;
  install: () => Promise<boolean>;
  onDismiss?: () => void;
}

const DESKTOPS: { os: DesktopOS; label: string; icon: typeof MonitorCogIcon }[] = [
  { os: 'windows', label: 'Windows', icon: MonitorCogIcon },
  { os: 'macos', label: 'macOS', icon: MonitorCogIcon },
  { os: 'linux', label: 'Linux', icon: LaptopIcon },
];

const RELEASES_URL =
  'https://github.com/vvsrinath/2026-Smart-India-Hackthon-SIH26113-1St-Years-Kalasalingam-University-Source-Code/releases';

export function DesktopAppBanner({ os, canInstall, install, onDismiss }: DesktopAppBannerProps) {
  return (
    <div className="fixed inset-x-3 bottom-20 z-50 rounded-2xl border border-brand/25 bg-white p-3 shadow-pop md:bottom-6 md:left-auto md:right-6 md:max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand">
          <MonitorDownIcon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-navy">Install the desktop app</p>
          <p className="mt-1 text-xs leading-5 text-ink-500">
            Run Swasthya Sathi like a native app — no browser tabs, its own window, works offline.
          </p>

          {canInstall ? (
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => void install()}>Install for {DESKTOP_OS_LABELS[os]}</Button>
              <Button variant="secondary" size="sm" onClick={onDismiss}>Not Now</Button>
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant={os === 'other' ? 'primary' : 'secondary'}>
                  <DownloadIcon className="h-3.5 w-3.5" />
                  {os === 'other' ? 'Download desktop app' : `Download for ${DESKTOP_OS_LABELS[os]}`}
                </Button>
              </a>
              {canInstall === false && (
                <Button size="sm" variant="secondary" onClick={onDismiss}>Not Now</Button>
              )}
            </div>
          )}

          {os !== 'other' && (
            <div className="mt-3 border-t border-line-soft pt-2">
              <p className="text-[11px] font-medium text-ink-400">Also available for</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {DESKTOPS.filter((d) => d.os !== os).map((d) => (
                  <a
                    key={d.os}
                    href={RELEASES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-line-soft/50 px-2 py-1 text-[11px] font-medium text-ink-600 hover:bg-line-soft"
                  >
                    <d.icon className="h-3 w-3" />
                    {d.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            aria-label="Dismiss desktop install prompt"
            onClick={onDismiss}
            className="rounded-full p-1.5 text-ink-400 hover:bg-line-soft hover:text-navy"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}