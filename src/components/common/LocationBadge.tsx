import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangleIcon,
  CrosshairIcon,
  Loader2Icon,
  MapPinIcon,
  RefreshCwIcon,
} from 'lucide-react';
import { useGeolocation, type GeoCoords } from '../../hooks/useGeolocation';
import { cn } from '../../utils/cn';

interface LocationBadgeProps {
  className?: string;
  /** Automatically ask for permission when the widget appears. Default true. */
  autoRequest?: boolean;
  /** Try to reverse-geocode the position into a place name (requires internet). */
  showPlaceName?: boolean;
}

function shortPlace(displayName: string): string {
  // Nominatim returns e.g. "Velachery, Chennai, Chennai District, Tamil Nadu, 600042, India"
  const parts = displayName.split(',').map((p) => p.trim()).filter(Boolean);
  return parts.slice(0, 3).join(', ');
}

function formatCoords(c: GeoCoords): string {
  return `${c.latitude.toFixed(5)}, ${c.longitude.toFixed(5)}`;
}

/**
 * Location widget: asks for browser location permission and shows the live
 * position (updates as the user moves). Shows a place name when the device is
 * online (reverse geocoded), and graceful fallbacks for denied / unsupported /
 * offline cases.
 */
export function LocationBadge({
  className,
  autoRequest = true,
  showPlaceName = true,
}: LocationBadgeProps) {
  const { status, coords, error, request } = useGeolocation({ autoRequest });
  const [place, setPlace] = useState<string | null>(null);
  const [geocoding, setGeocoding] = useState(false);
  const geocodedRef = useRef(false);

  // Reverse-geocode once per grant when online; offline we show coordinates only.
  useEffect(() => {
    if (!showPlaceName || status !== 'granted' || !coords || geocodedRef.current) return;
    if (typeof navigator === 'undefined' || !navigator.onLine) return;

    geocodedRef.current = true;
    setGeocoding(true);
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&zoom=14`,
      { headers: { Accept: 'application/json' } },
    )
      .then((response) => (response.ok ? response.json() : Promise.resolve(null)))
      .then((data: { display_name?: string } | null) => {
        setPlace(data?.display_name ? shortPlace(data.display_name) : null);
      })
      .catch(() => setPlace(null))
      .finally(() => setGeocoding(false));
  }, [status, coords, showPlaceName]);

  const granted = status === 'granted' && coords;

  return (
    <div
      className={cn('flex flex-wrap items-center gap-x-3 gap-y-2', className)}
      role="status"
      aria-live="assertive"
    >
      {/* Status icon */}
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px]',
          granted
            ? 'bg-brand-tint text-brand'
            : status === 'denied' || status === 'unavailable'
              ? 'bg-amber-50 text-amber-600'
              : 'bg-line-soft text-ink-500',
        )}
      >
        {status === 'requesting' ? (
          <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : granted ? (
          <MapPinIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <CrosshairIcon className="h-4 w-4" aria-hidden="true" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        {granted ? (
          <>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-navy">
              <span
                className="relative flex h-2 w-2"
                aria-hidden="true"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Live location
              {geocoding && (
                <Loader2Icon className="h-3 w-3 animate-spin text-ink-400" aria-hidden="true" />
              )}
            </p>
            <p className="mt-0.5 truncate text-2xs text-ink-500">
              {place ? `${place} · ` : ''}
              <span className="font-mono tabular-nums">{formatCoords(coords)}</span>
              <span className="text-ink-400">
                {' '}
                (±{(coords.accuracy / 1000).toFixed(2)} km)
              </span>
            </p>
          </>
        ) : status === 'denied' ? (
          <>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-navy">
              <AlertTriangleIcon className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
              Location permission denied
            </p>
            <p className="mt-0.5 text-2xs text-ink-500">
              Allow location access in your browser settings, then try again.
            </p>
          </>
        ) : status === 'unavailable' ? (
          <>
            <p className="text-xs font-semibold text-navy">Location not supported</p>
            <p className="mt-0.5 text-2xs text-ink-500">
              This browser or device does not support geolocation.
            </p>
          </>
        ) : status === 'error' ? (
          <>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-navy">
              <AlertTriangleIcon className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
              Could not get your location
            </p>
            <p className="mt-0.5 truncate text-2xs text-ink-500">
              {error || 'Try again, or move to an open area.'}
            </p>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold text-navy">Where are you?</p>
            <p className="mt-0.5 text-2xs text-ink-500">
              Share your live location to find healthcare services near you.
            </p>
          </>
        )}
      </div>

      {/* Action */}
      {!granted && status !== 'requesting' ? (
        <button
          type="button"
          onClick={request}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-chip px-3 text-xs font-medium transition-colors duration-150 ease-out',
            status === 'idle'
              ? 'bg-brand text-white hover:bg-brand-dark'
              : 'border border-line text-ink-500 hover:border-brand/30 hover:text-navy',
          )}
        >
          {status === 'idle' ? (
            <>
              <CrosshairIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Enable live location
            </>
          ) : (
            <>
              <RefreshCwIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Try again
            </>
          )}
        </button>
      ) : (
        granted && (
          <button
            type="button"
            onClick={request}
            className="inline-flex h-8 items-center gap-1.5 rounded-chip px-3 text-2xs font-medium text-ink-500 transition-colors duration-150 ease-out hover:bg-line-soft hover:text-navy"
            title="Re-fetch your current position"
          >
            <RefreshCwIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Refresh
          </button>
        )
      )}
    </div>
  );
}