import React from 'react';
import { MonitorDownIcon, XIcon } from 'lucide-react';
import { Button } from '../common/Button';

interface DesktopAppBannerProps {
  canInstall: boolean;
  install: () => Promise<boolean>;
  onDismiss?: () => void;
}

type Browser = 'chrome' | 'edge' | 'firefox' | 'safari' | 'opera' | 'other';

function detectBrowser(): Browser {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('edg/')) return 'edge';
  if (ua.includes('opr/') || ua.includes('opera')) return 'opera';
  if (ua.includes('firefox')) return 'firefox';
  // Chrome's UA also contains "Safari", so check Chrome first.
  if (ua.includes('chrome') || ua.includes('crios')) return 'chrome';
  if (ua.includes('safari')) return 'safari';
  return 'other';
}

function installSteps(browser: Browser): string {
  switch (browser) {
    case 'edge':
      return 'Click the app icon in the address bar and choose “Install Swasthya Sathi”.';
    case 'firefox':
      return 'Open the menu (☰) and choose “Install App” or “Install Swasthya Sathi”.';
    case 'safari':
      return 'Open File → “Add to Dock” to install Swasthya Sathi on your Mac.';
    case 'opera':
      return 'Click the installation icon that appears in the address bar.';
    case 'chrome':
    default:
      return 'Click the install icon in the address bar (looks like a monitor with a down arrow).';
  }
}

export function DesktopAppBanner({ canInstall, install, onDismiss }: DesktopAppBannerProps) {
  const browser = detectBrowser();

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
              <Button size="sm" onClick={() => void install()}>Install now</Button>
              <Button variant="secondary" size="sm" onClick={onDismiss}>Not Now</Button>
            </div>
          ) : (
            <div className="mt-3 rounded-lg border border-line-soft bg-brand-tint2/60 p-2.5">
              <p className="text-2xs leading-4 text-ink-500">
                <span className="font-medium text-navy">How to install:</span>{' '}
                {installSteps(browser)}
              </p>
              <Button size="sm" variant="secondary" className="mt-2.5" onClick={onDismiss}>Got it</Button>
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