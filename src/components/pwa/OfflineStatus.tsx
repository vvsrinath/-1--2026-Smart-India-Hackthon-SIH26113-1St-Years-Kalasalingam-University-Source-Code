import { WifiOffIcon, WifiIcon } from 'lucide-react';
import { usePwa } from '../../hooks/usePwa';

export function OfflineStatus() {
  const { isOnline } = usePwa();

  if (isOnline) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs text-amber-900">
      <div className="flex items-center justify-center gap-2">
        <WifiOffIcon className="h-3.5 w-3.5" />
        <span className="font-medium">Limited Connection</span>
      </div>
      <p className="mt-0.5 text-[11px] text-amber-800">You are currently offline.</p>
    </div>
  );
}

export function OnlineStatus() {
  const { isOnline } = usePwa();

  if (!isOnline) return null;

  return (
    <div className="border-b border-emerald-200 bg-emerald-50 px-3 py-2 text-center text-xs text-emerald-900">
      <div className="flex items-center justify-center gap-2">
        <WifiIcon className="h-3.5 w-3.5" />
        <span className="font-medium">Connection restored</span>
      </div>
    </div>
  );
}
